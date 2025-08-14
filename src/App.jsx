import React, { useState, useEffect } from 'react'
import { Plus, Filter, Calendar, Users, School } from 'lucide-react'
import FormularioVisita from './components/FormularioVisita'
import TabelaVisitas from './components/TabelaVisitas'
import Filtros from './components/Filtros'
import Dashboard from './components/Dashboard'
import './App.css'

// Importar dados iniciais
import visitasIniciais from './data/visitas.json'
import escolasData from './data/escolas.json'
import profissionaisData from './data/profissionais.json'

function App() {
  const [visitas, setVisitas] = useState([])
  const [escolas, setEscolas] = useState([])
  const [profissionais, setProfissionais] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [visitaEditando, setVisitaEditando] = useState(null)
  const [filtros, setFiltros] = useState({
    escola: '',
    profissional: '',
    dataInicio: '',
    dataFim: '',
    status: '',
    tipoVisita: ''
  })
  const [abaSelecionada, setAbaSelecionada] = useState('dashboard')

  // Carregar dados do localStorage ou usar dados iniciais
  useEffect(() => {
    const visitasSalvas = localStorage.getItem('visitas')
    if (visitasSalvas) {
      setVisitas(JSON.parse(visitasSalvas))
    } else {
      setVisitas(visitasIniciais)
      localStorage.setItem('visitas', JSON.stringify(visitasIniciais))
    }

    const escolasSalvas = localStorage.getItem('escolas')
    if (escolasSalvas) {
      setEscolas(JSON.parse(escolasSalvas))
    } else {
      setEscolas(escolasData)
      localStorage.setItem('escolas', JSON.stringify(escolasData))
    }

    const profissionaisSalvos = localStorage.getItem('profissionais')
    if (profissionaisSalvos) {
      setProfissionais(JSON.parse(profissionaisSalvos))
    } else {
      setProfissionais(profissionaisData)
      localStorage.setItem('profissionais', JSON.stringify(profissionaisData))
    }
  }, [])

  // Salvar dados no localStorage sempre que mudarem
  useEffect(() => {
    if (visitas.length > 0) {
      localStorage.setItem('visitas', JSON.stringify(visitas))
    }
  }, [visitas])

  const adicionarVisita = (novaVisita) => {
    const visitaComId = {
      ...novaVisita,
      id: Date.now(),
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    }
    setVisitas(prev => [...prev, visitaComId])
    setMostrarFormulario(false)
  }

  const editarVisita = (visitaAtualizada) => {
    setVisitas(prev => prev.map(v => 
      v.id === visitaAtualizada.id 
        ? { ...visitaAtualizada, atualizadoEm: new Date().toISOString() }
        : v
    ))
    setVisitaEditando(null)
    setMostrarFormulario(false)
  }

  const excluirVisita = (id) => {
    setVisitas(prev => prev.filter(v => v.id !== id))
  }

  const filtrarVisitas = () => {
    return visitas.filter(visita => {
      const escola = escolas.find(e => e.id === visita.escolaId)
      const profissional = profissionais.find(p => p.id === visita.profissionalId)
      
      return (
        (!filtros.escola || escola?.nome.toLowerCase().includes(filtros.escola.toLowerCase())) &&
        (!filtros.profissional || profissional?.nome.toLowerCase().includes(filtros.profissional.toLowerCase())) &&
        (!filtros.dataInicio || visita.dataVisita >= filtros.dataInicio) &&
        (!filtros.dataFim || visita.dataVisita <= filtros.dataFim) &&
        (!filtros.status || visita.status === filtros.status) &&
        (!filtros.tipoVisita || visita.tipoVisita === filtros.tipoVisita)
      )
    })
  }

  const abrirFormulario = (visita = null) => {
    setVisitaEditando(visita)
    setMostrarFormulario(true)
  }

  const fecharFormulario = () => {
    setMostrarFormulario(false)
    setVisitaEditando(null)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Sistema de Acompanhamento Escolar</h1>
        <p>Gestão de visitas técnicas e formação continuada</p>
      </header>

      <nav className="navigation">
        <button 
          className={`nav-btn ${abaSelecionada === 'dashboard' ? 'active' : ''}`}
          onClick={() => setAbaSelecionada('dashboard')}
        >
          <Calendar className="icon" />
          Dashboard
        </button>
        <button 
          className={`nav-btn ${abaSelecionada === 'visitas' ? 'active' : ''}`}
          onClick={() => setAbaSelecionada('visitas')}
        >
          <School className="icon" />
          Visitas
        </button>
        <button 
          className="btn-primary"
          onClick={() => abrirFormulario()}
        >
          <Plus className="icon" />
          Nova Visita
        </button>
      </nav>

      <main className="main-content">
        {abaSelecionada === 'dashboard' && (
          <Dashboard 
            visitas={visitas}
            escolas={escolas}
            profissionais={profissionais}
          />
        )}

        {abaSelecionada === 'visitas' && (
          <>
            <Filtros 
              filtros={filtros}
              setFiltros={setFiltros}
              escolas={escolas}
              profissionais={profissionais}
            />
            
            <TabelaVisitas
              visitas={filtrarVisitas()}
              escolas={escolas}
              profissionais={profissionais}
              onEditar={abrirFormulario}
              onExcluir={excluirVisita}
            />
          </>
        )}
      </main>

      {mostrarFormulario && (
        <FormularioVisita
          visita={visitaEditando}
          escolas={escolas}
          profissionais={profissionais}
          onSalvar={visitaEditando ? editarVisita : adicionarVisita}
          onCancelar={fecharFormulario}
        />
      )}
    </div>
  )
}

export default App
