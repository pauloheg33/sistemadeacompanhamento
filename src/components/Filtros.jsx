import React from 'react'
import { Filter, X, Calendar, User, School, Clock } from 'lucide-react'

const Filtros = ({ filtros, setFiltros, escolas, profissionais }) => {
  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }))
  }

  const limparFiltros = () => {
    setFiltros({
      escola: '',
      profissional: '',
      dataInicio: '',
      dataFim: '',
      status: '',
      tipoVisita: ''
    })
  }

  const temFiltrosAtivos = Object.values(filtros).some(valor => valor !== '')

  const tiposVisita = [
    'Acompanhamento Pedagógico',
    'Formação Continuada',
    'Monitoramento',
    'Avaliação',
    'Orientação Técnica',
    'Reunião de Planejamento',
    'Workshop',
    'Capacitação'
  ]

  const statusOptions = [
    'Pendente',
    'Em Andamento',
    'Concluída',
    'Cancelada'
  ]

  return (
    <div className="filtros-container">
      <div className="filtros-header">
        <h3>
          <Filter className="icon" />
          Filtros
        </h3>
        {temFiltrosAtivos && (
          <button className="btn-clear-filters" onClick={limparFiltros}>
            <X className="icon" />
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="filtros-grid">
        <div className="filtro-group">
          <label>
            <School className="icon" />
            Escola
          </label>
          <select
            value={filtros.escola}
            onChange={(e) => handleFiltroChange('escola', e.target.value)}
          >
            <option value="">Todas as escolas</option>
            {escolas.map(escola => (
              <option key={escola.id} value={escola.nome}>
                {escola.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-group">
          <label>
            <User className="icon" />
            Profissional
          </label>
          <select
            value={filtros.profissional}
            onChange={(e) => handleFiltroChange('profissional', e.target.value)}
          >
            <option value="">Todos os profissionais</option>
            {profissionais.map(prof => (
              <option key={prof.id} value={prof.nome}>
                {prof.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-group">
          <label>
            <Calendar className="icon" />
            Data Início
          </label>
          <input
            type="date"
            value={filtros.dataInicio}
            onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
          />
        </div>

        <div className="filtro-group">
          <label>
            <Calendar className="icon" />
            Data Fim
          </label>
          <input
            type="date"
            value={filtros.dataFim}
            onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
          />
        </div>

        <div className="filtro-group">
          <label>Tipo de Visita</label>
          <select
            value={filtros.tipoVisita}
            onChange={(e) => handleFiltroChange('tipoVisita', e.target.value)}
          >
            <option value="">Todos os tipos</option>
            {tiposVisita.map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-group">
          <label>
            <Clock className="icon" />
            Status
          </label>
          <select
            value={filtros.status}
            onChange={(e) => handleFiltroChange('status', e.target.value)}
          >
            <option value="">Todos os status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {temFiltrosAtivos && (
        <div className="filtros-ativos">
          <h4>Filtros aplicados:</h4>
          <div className="tags-filtros">
            {filtros.escola && (
              <span className="tag-filtro">
                Escola: {filtros.escola}
                <button onClick={() => handleFiltroChange('escola', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filtros.profissional && (
              <span className="tag-filtro">
                Profissional: {filtros.profissional}
                <button onClick={() => handleFiltroChange('profissional', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filtros.dataInicio && (
              <span className="tag-filtro">
                A partir de: {new Date(filtros.dataInicio).toLocaleDateString()}
                <button onClick={() => handleFiltroChange('dataInicio', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filtros.dataFim && (
              <span className="tag-filtro">
                Até: {new Date(filtros.dataFim).toLocaleDateString()}
                <button onClick={() => handleFiltroChange('dataFim', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filtros.tipoVisita && (
              <span className="tag-filtro">
                Tipo: {filtros.tipoVisita}
                <button onClick={() => handleFiltroChange('tipoVisita', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filtros.status && (
              <span className="tag-filtro">
                Status: {filtros.status}
                <button onClick={() => handleFiltroChange('status', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Filtros
