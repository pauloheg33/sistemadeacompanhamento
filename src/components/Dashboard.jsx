import React from 'react'
import { Calendar, Users, School, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const Dashboard = ({ visitas, escolas, profissionais }) => {
  const hoje = new Date()
  const inicioMes = startOfMonth(hoje)
  const fimMes = endOfMonth(hoje)

  // Estatísticas gerais
  const totalVisitas = visitas.length
  const visitasConcluidas = visitas.filter(v => v.status === 'Concluída').length
  const visitasEmAndamento = visitas.filter(v => v.status === 'Em Andamento').length
  const visitasPendentes = visitas.filter(v => v.status === 'Pendente').length

  // Visitas do mês atual
  const visitasDoMes = visitas.filter(visita => {
    const dataVisita = parseISO(visita.dataVisita)
    return isWithinInterval(dataVisita, { start: inicioMes, end: fimMes })
  })

  // Escolas mais visitadas
  const escolasVisitadas = visitas.reduce((acc, visita) => {
    const escola = escolas.find(e => e.id === visita.escolaId)
    if (escola) {
      acc[escola.nome] = (acc[escola.nome] || 0) + 1
    }
    return acc
  }, {})

  const escolasTopVisitadas = Object.entries(escolasVisitadas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Profissionais mais ativos
  const profissionaisAtivos = visitas.reduce((acc, visita) => {
    const profissional = profissionais.find(p => p.id === visita.profissionalId)
    if (profissional) {
      acc[profissional.nome] = (acc[profissional.nome] || 0) + 1
    }
    return acc
  }, {})

  const profissionaisTop = Object.entries(profissionaisAtivos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Próximas visitas
  const proximasVisitas = visitas
    .filter(v => new Date(v.dataVisita) >= hoje && v.status !== 'Concluída')
    .sort((a, b) => new Date(a.dataVisita) - new Date(b.dataVisita))
    .slice(0, 5)

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
    </div>
  )

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard - Visão Geral</h2>
        <p>Resumo das atividades de acompanhamento escolar</p>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={Calendar}
          title="Total de Visitas"
          value={totalVisitas}
          color="blue"
        />
        <StatCard
          icon={CheckCircle}
          title="Visitas Concluídas"
          value={visitasConcluidas}
          subtitle={`${totalVisitas > 0 ? Math.round((visitasConcluidas / totalVisitas) * 100) : 0}% do total`}
          color="green"
        />
        <StatCard
          icon={Clock}
          title="Em Andamento"
          value={visitasEmAndamento}
          color="orange"
        />
        <StatCard
          icon={TrendingUp}
          title="Visitas neste Mês"
          value={visitasDoMes.length}
          color="purple"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>
            <School className="icon" />
            Escolas Mais Visitadas
          </h3>
          <div className="ranking-list">
            {escolasTopVisitadas.length > 0 ? (
              escolasTopVisitadas.map(([escola, total], index) => (
                <div key={escola} className="ranking-item">
                  <span className="ranking-position">{index + 1}º</span>
                  <span className="ranking-name">{escola}</span>
                  <span className="ranking-value">{total} visitas</span>
                </div>
              ))
            ) : (
              <p className="empty-state">Nenhuma visita registrada ainda</p>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>
            <Users className="icon" />
            Profissionais Mais Ativos
          </h3>
          <div className="ranking-list">
            {profissionaisTop.length > 0 ? (
              profissionaisTop.map(([profissional, total], index) => (
                <div key={profissional} className="ranking-item">
                  <span className="ranking-position">{index + 1}º</span>
                  <span className="ranking-name">{profissional}</span>
                  <span className="ranking-value">{total} visitas</span>
                </div>
              ))
            ) : (
              <p className="empty-state">Nenhuma visita registrada ainda</p>
            )}
          </div>
        </div>

        <div className="dashboard-card full-width">
          <h3>
            <Calendar className="icon" />
            Próximas Visitas
          </h3>
          <div className="proximas-visitas">
            {proximasVisitas.length > 0 ? (
              proximasVisitas.map(visita => {
                const escola = escolas.find(e => e.id === visita.escolaId)
                const profissional = profissionais.find(p => p.id === visita.profissionalId)
                return (
                  <div key={visita.id} className="visita-item">
                    <div className="visita-data">
                      <span className="data">
                        {format(parseISO(visita.dataVisita), 'dd/MM', { locale: ptBR })}
                      </span>
                      <span className="hora">
                        {visita.horaInicio}
                      </span>
                    </div>
                    <div className="visita-info">
                      <h4>{escola?.nome}</h4>
                      <p>{profissional?.nome} - {visita.tipoVisita}</p>
                      <span className={`status-badge ${visita.status.toLowerCase().replace(' ', '-')}`}>
                        {visita.status}
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="empty-state">Nenhuma visita agendada</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
