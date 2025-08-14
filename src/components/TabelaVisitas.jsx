import React, { useState } from 'react'
import { Edit, Trash2, Eye, Calendar, Clock, User, School, ChevronDown, ChevronUp } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const TabelaVisitas = ({ visitas, escolas, profissionais, onEditar, onExcluir }) => {
  const [ordenacao, setOrdenacao] = useState({ campo: 'dataVisita', direcao: 'desc' })
  const [visitaExpandida, setVisitaExpandida] = useState(null)

  const ordenarVisitas = (visitas) => {
    return [...visitas].sort((a, b) => {
      let valorA = a[ordenacao.campo]
      let valorB = b[ordenacao.campo]

      // Tratamento especial para campos que precisam de lookup
      if (ordenacao.campo === 'escola') {
        const escolaA = escolas.find(e => e.id === a.escolaId)
        const escolaB = escolas.find(e => e.id === b.escolaId)
        valorA = escolaA?.nome || ''
        valorB = escolaB?.nome || ''
      }

      if (ordenacao.campo === 'profissional') {
        const profA = profissionais.find(p => p.id === a.profissionalId)
        const profB = profissionais.find(p => p.id === b.profissionalId)
        valorA = profA?.nome || ''
        valorB = profB?.nome || ''
      }

      if (valorA < valorB) {
        return ordenacao.direcao === 'asc' ? -1 : 1
      }
      if (valorA > valorB) {
        return ordenacao.direcao === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  const mudarOrdenacao = (campo) => {
    setOrdenacao(prev => ({
      campo,
      direcao: prev.campo === campo && prev.direcao === 'asc' ? 'desc' : 'asc'
    }))
  }

  const toggleExpandir = (visitaId) => {
    setVisitaExpandida(prev => prev === visitaId ? null : visitaId)
  }

  const confirmarExclusao = (visita) => {
    const escola = escolas.find(e => e.id === visita.escolaId)
    if (window.confirm(`Tem certeza que deseja excluir a visita à ${escola?.nome} em ${format(parseISO(visita.dataVisita), 'dd/MM/yyyy', { locale: ptBR })}?`)) {
      onExcluir(visita.id)
    }
  }

  const visitasOrdenadas = ordenarVisitas(visitas)

  const CabecalhoOrdenavel = ({ campo, children }) => (
    <th 
      className="sortable-header"
      onClick={() => mudarOrdenacao(campo)}
    >
      <div className="header-content">
        {children}
        {ordenacao.campo === campo && (
          ordenacao.direcao === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
        )}
      </div>
    </th>
  )

  if (visitas.length === 0) {
    return (
      <div className="empty-state-container">
        <Calendar size={48} className="empty-icon" />
        <h3>Nenhuma visita encontrada</h3>
        <p>Não há visitas que correspondam aos filtros selecionados.</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Visitas Registradas ({visitas.length})</h3>
      </div>
      
      <div className="table-wrapper">
        <table className="visitas-table">
          <thead>
            <tr>
              <th></th>
              <CabecalhoOrdenavel campo="dataVisita">
                <Calendar className="icon" />
                Data
              </CabecalhoOrdenavel>
              <CabecalhoOrdenavel campo="escola">
                <School className="icon" />
                Escola
              </CabecalhoOrdenavel>
              <CabecalhoOrdenavel campo="profissional">
                <User className="icon" />
                Profissional
              </CabecalhoOrdenavel>
              <CabecalhoOrdenavel campo="tipoVisita">
                Tipo
              </CabecalhoOrdenavel>
              <CabecalhoOrdenavel campo="status">
                Status
              </CabecalhoOrdenavel>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visitasOrdenadas.map(visita => {
              const escola = escolas.find(e => e.id === visita.escolaId)
              const profissional = profissionais.find(p => p.id === visita.profissionalId)
              const expandida = visitaExpandida === visita.id

              return (
                <React.Fragment key={visita.id}>
                  <tr className={`table-row ${expandida ? 'expanded' : ''}`}>
                    <td>
                      <button 
                        className="expand-btn"
                        onClick={() => toggleExpandir(visita.id)}
                        title={expandida ? 'Recolher detalhes' : 'Expandir detalhes'}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                    <td>
                      <div className="date-cell">
                        <span className="date">
                          {format(parseISO(visita.dataVisita), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                        <span className="time">
                          <Clock size={12} />
                          {visita.horaInicio} - {visita.horaFim}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="escola-cell">
                        <strong>{escola?.nome}</strong>
                        <span className="escola-diretor">Dir.: {escola?.diretor}</span>
                      </div>
                    </td>
                    <td>
                      <div className="profissional-cell">
                        <strong>{profissional?.nome}</strong>
                        <span className="profissional-cargo">{profissional?.cargo}</span>
                      </div>
                    </td>
                    <td>
                      <span className="tipo-visita">{visita.tipoVisita}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${visita.status.toLowerCase().replace(' ', '-')}`}>
                        {visita.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-action edit"
                          onClick={() => onEditar(visita)}
                          title="Editar visita"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn-action delete"
                          onClick={() => confirmarExclusao(visita)}
                          title="Excluir visita"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {expandida && (
                    <tr className="expanded-row">
                      <td colSpan="7">
                        <div className="expanded-content">
                          <div className="details-grid">
                            <div className="detail-section">
                              <h4>Objetivos</h4>
                              <p>{visita.objetivos || 'Não informado'}</p>
                            </div>
                            
                            {visita.atividadesRealizadas && (
                              <div className="detail-section">
                                <h4>Atividades Realizadas</h4>
                                <p>{visita.atividadesRealizadas}</p>
                              </div>
                            )}
                            
                            {visita.observacoes && (
                              <div className="detail-section">
                                <h4>Observações</h4>
                                <p>{visita.observacoes}</p>
                              </div>
                            )}
                            
                            {visita.proximasAcoes && (
                              <div className="detail-section">
                                <h4>Próximas Ações</h4>
                                <p>{visita.proximasAcoes}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="metadata">
                            <span>Criado em: {format(parseISO(visita.criadoEm), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</span>
                            {visita.atualizadoEm !== visita.criadoEm && (
                              <span>Atualizado em: {format(parseISO(visita.atualizadoEm), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TabelaVisitas
