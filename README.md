# Sistema de Acompanhamento Escolar

## Descrição

Sistema web para gestão de visitas técnicas e formação continuada em escolas. Permite o cadastro, edição, visualização e filtragem de visitas realizadas por técnicos de acompanhamento, formadores e gerentes de setor.

## Funcionalidades

### 📊 Dashboard
- Visão geral das estatísticas de visitas
- Gráficos de visitas por status (pendente, em andamento, concluída)
- Ranking de escolas mais visitadas
- Ranking de profissionais mais ativos
- Lista das próximas visitas agendadas

### 📝 Gestão de Visitas
- **Cadastro de visitas**: Formulário completo com todos os campos necessários
- **Edição de visitas**: Possibilidade de alterar informações já cadastradas
- **Visualização detalhada**: Expandir linhas da tabela para ver todos os detalhes
- **Exclusão de visitas**: Remoção com confirmação

### 🔍 Filtros e Busca
- Filtro por escola
- Filtro por profissional
- Filtro por período (data início e fim)
- Filtro por tipo de visita
- Filtro por status
- Tags visuais dos filtros aplicados
- Opção de limpar todos os filtros

### 📱 Interface Responsiva
- Design moderno e responsivo
- Funciona em desktop, tablet e mobile
- Interface intuitiva e fácil de usar

## Tecnologias Utilizadas

- **React 19**: Framework JavaScript para construção da interface
- **Vite**: Build tool rápida e moderna
- **Lucide React**: Biblioteca de ícones
- **Date-fns**: Biblioteca para manipulação de datas
- **CSS Grid/Flexbox**: Layout responsivo
- **LocalStorage**: Armazenamento local dos dados

## Estrutura de Dados

### Escolas
- ID, Nome, Endereço, Bairro, Cidade
- Telefone, Diretor, Status (ativo/inativo)

### Profissionais
- ID, Nome, Cargo (Técnico/Formador/Gerente)
- Email, Telefone, Status (ativo/inativo)

### Visitas
- ID, Profissional, Escola, Data e horário
- Tipo de visita, Objetivos, Atividades realizadas
- Observações, Próximas ações, Status
- Timestamps de criação e atualização

## Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação
1. Clone o repositório
```bash
git clone https://github.com/pauloheg33/sistemadeacompanhamento.git
cd sistemadeacompanhamento/sistema-acompanhamento-escolar
```

2. Instale as dependências
```bash
npm install
```

3. Execute em modo de desenvolvimento
```bash
npm run dev
```

4. Acesse http://localhost:5173

### Build para Produção
```bash
npm run build
```

### Deploy no GitHub Pages
```bash
npm run deploy
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Dashboard.jsx    # Página inicial com estatísticas
│   ├── FormularioVisita.jsx  # Formulário de cadastro/edição
│   ├── TabelaVisitas.jsx     # Tabela com listagem
│   └── Filtros.jsx      # Componente de filtros
├── data/               # Dados simulados (JSON)
│   ├── escolas.json    # Lista de escolas
│   ├── profissionais.json   # Lista de profissionais
│   └── visitas.json    # Visitas de exemplo
├── utils/              # Utilitários
├── App.jsx             # Componente principal
├── App.css             # Estilos principais
└── main.jsx            # Entrada da aplicação
```

## Configuração para GitHub Pages

O projeto está configurado para deploy automático no GitHub Pages através de GitHub Actions. A cada push na branch main, o site é automaticamente construído e publicado.

### Configurações necessárias:
1. No repositório GitHub, vá em Settings > Pages
2. Selecione "GitHub Actions" como source
3. O workflow `.github/workflows/deploy.yml` fará o resto

## Personalização

### Adicionando Novas Escolas
Edite o arquivo `src/data/escolas.json` ou use a interface para cadastrar via localStorage.

### Adicionando Novos Profissionais
Edite o arquivo `src/data/profissionais.json` ou implemente interface de cadastro.

### Modificando Tipos de Visita
No arquivo `src/components/FormularioVisita.jsx`, modifique o array `tiposVisita`.

### Integrações Futuras
- API do Google Sheets para sincronização em tempo real
- Sistema de autenticação
- Relatórios em PDF
- Notificações por email
- Backup automático dos dados

## Dados de Exemplo

O sistema vem com dados de exemplo pré-carregados:
- 5 escolas fictícias
- 6 profissionais de diferentes cargos
- 3 visitas de exemplo

Os dados são armazenados no localStorage do navegador, permitindo persistência entre sessões.

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Suporte

Para dúvidas ou sugestões, abra uma issue no repositório GitHub.

---

**Desenvolvido com ❤️ para facilitar o acompanhamento escolar**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
