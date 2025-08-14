import React, { useState, useEffect } from 'react'
import { X, Save, Calendar, Clock, User, School, FileText } from 'lucide-react'

const FormularioVisita = ({ visita, escolas, profissionais, onSalvar, onCancelar }) => {
  const [formData, setFormData] = useState({
    profissionalId: '',
    escolaId: '',
    dataVisita: '',
    horaInicio: '',
    horaFim: '',
    tipoVisita: '',
    objetivos: '',
    atividadesRealizadas: '',
    observacoes: '',
    proximasAcoes: '',
    status: 'Pendente'
  })

  const [erros, setErros] = useState({})

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

  useEffect(() => {
    if (visita) {
      setFormData(visita)
    }
  }, [visita])

  const validarFormulario = () => {
    const novosErros = {}

    if (!formData.profissionalId) novosErros.profissionalId = 'Selecione um profissional'
    if (!formData.escolaId) novosErros.escolaId = 'Selecione uma escola'
    if (!formData.dataVisita) novosErros.dataVisita = 'Data da visita é obrigatória'
    if (!formData.horaInicio) novosErros.horaInicio = 'Hora de início é obrigatória'
    if (!formData.horaFim) novosErros.horaFim = 'Hora de fim é obrigatória'
    if (!formData.tipoVisita) novosErros.tipoVisita = 'Tipo de visita é obrigatório'
    if (!formData.objetivos.trim()) novosErros.objetivos = 'Objetivos são obrigatórios'

    if (formData.horaInicio && formData.horaFim && formData.horaInicio >= formData.horaFim) {
      novosErros.horaFim = 'Hora de fim deve ser posterior à hora de início'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      onSalvar(formData)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            <FileText className="icon" />
            {visita ? 'Editar Visita' : 'Nova Visita'}
          </h2>
          <button className="btn-close" onClick={onCancelar}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <div className="form-group">
              <label>
                <User className="icon" />
                Profissional *
              </label>
              <select
                name="profissionalId"
                value={formData.profissionalId}
                onChange={handleChange}
                className={erros.profissionalId ? 'error' : ''}
              >
                <option value="">Selecione um profissional</option>
                {profissionais.map(prof => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nome} - {prof.cargo}
                  </option>
                ))}
              </select>
              {erros.profissionalId && <span className="error-message">{erros.profissionalId}</span>}
            </div>

            <div className="form-group">
              <label>
                <School className="icon" />
                Escola *
              </label>
              <select
                name="escolaId"
                value={formData.escolaId}
                onChange={handleChange}
                className={erros.escolaId ? 'error' : ''}
              >
                <option value="">Selecione uma escola</option>
                {escolas.map(escola => (
                  <option key={escola.id} value={escola.id}>
                    {escola.nome}
                  </option>
                ))}
              </select>
              {erros.escolaId && <span className="error-message">{erros.escolaId}</span>}
            </div>

            <div className="form-group">
              <label>
                <Calendar className="icon" />
                Data da Visita *
              </label>
              <input
                type="date"
                name="dataVisita"
                value={formData.dataVisita}
                onChange={handleChange}
                className={erros.dataVisita ? 'error' : ''}
              />
              {erros.dataVisita && <span className="error-message">{erros.dataVisita}</span>}
            </div>

            <div className="form-group">
              <label>Tipo de Visita *</label>
              <select
                name="tipoVisita"
                value={formData.tipoVisita}
                onChange={handleChange}
                className={erros.tipoVisita ? 'error' : ''}
              >
                <option value="">Selecione o tipo</option>
                {tiposVisita.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              {erros.tipoVisita && <span className="error-message">{erros.tipoVisita}</span>}
            </div>

            <div className="form-group">
              <label>
                <Clock className="icon" />
                Hora de Início *
              </label>
              <input
                type="time"
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleChange}
                className={erros.horaInicio ? 'error' : ''}
              />
              {erros.horaInicio && <span className="error-message">{erros.horaInicio}</span>}
            </div>

            <div className="form-group">
              <label>
                <Clock className="icon" />
                Hora de Fim *
              </label>
              <input
                type="time"
                name="horaFim"
                value={formData.horaFim}
                onChange={handleChange}
                className={erros.horaFim ? 'error' : ''}
              />
              {erros.horaFim && <span className="error-message">{erros.horaFim}</span>}
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Objetivos *</label>
            <textarea
              name="objetivos"
              value={formData.objetivos}
              onChange={handleChange}
              placeholder="Descreva os objetivos da visita..."
              rows="3"
              className={erros.objetivos ? 'error' : ''}
            />
            {erros.objetivos && <span className="error-message">{erros.objetivos}</span>}
          </div>

          <div className="form-group full-width">
            <label>Atividades Realizadas</label>
            <textarea
              name="atividadesRealizadas"
              value={formData.atividadesRealizadas}
              onChange={handleChange}
              placeholder="Descreva as atividades que foram ou serão realizadas..."
              rows="4"
            />
          </div>

          <div className="form-group full-width">
            <label>Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Observações adicionais..."
              rows="3"
            />
          </div>

          <div className="form-group full-width">
            <label>Próximas Ações</label>
            <textarea
              name="proximasAcoes"
              value={formData.proximasAcoes}
              onChange={handleChange}
              placeholder="Descreva as próximas ações a serem tomadas..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <Save className="icon" />
              {visita ? 'Atualizar' : 'Salvar'} Visita
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormularioVisita
