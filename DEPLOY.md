# Instruções de Deploy - Sistema de Acompanhamento Escolar

## Como fazer o deploy no GitHub Pages

### Passo 1: Configurar o repositório no GitHub
1. Faça push de todo o código para o seu repositório GitHub
2. Vá até Settings > Pages no seu repositório
3. Em "Source", selecione "GitHub Actions"

### Passo 2: Deploy automático
O deploy acontece automaticamente através do GitHub Actions sempre que você fizer push para a branch `main`.

### Passo 3: Acessar o site
Após o deploy, o site estará disponível em:
`https://pauloheg33.github.io/sistemadeacompanhamento/`

## Estrutura de deploy
- O workflow está em `.github/workflows/deploy.yml`
- O build é feito com `npm run build`
- Os arquivos são publicados na pasta `dist/`
- A configuração `base: '/sistemadeacompanhamento/'` no `vite.config.js` garante que os assets sejam carregados corretamente

## Comandos úteis

### Desenvolvimento local
```bash
npm run dev
```

### Build para produção
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

### Deploy manual (se necessário)
```bash
npm run deploy
```

## Verificação de funcionamento
1. Verifique se o build é gerado sem erros
2. Teste a aplicação localmente com `npm run dev`
3. Faça commit e push das mudanças
4. Acompanhe o processo no tab "Actions" do GitHub
5. Acesse o site publicado

## Troubleshooting

### Se o site não carregar corretamente:
1. Verifique se a base URL está correta no `vite.config.js`
2. Confirme que o GitHub Pages está configurado para usar GitHub Actions
3. Verifique os logs do workflow no tab "Actions"

### Se houver erros de build:
1. Execute `npm run build` localmente
2. Corrija os erros antes de fazer push
3. Certifique-se de que todas as dependências estão instaladas

### Para atualizar dados:
1. Edite os arquivos JSON em `src/data/`
2. Ou use a interface para adicionar novos dados (salvos no localStorage)
3. Para dados permanentes, edite os arquivos e faça novo deploy

## Manutenção
- Os dados são armazenados localmente no navegador (localStorage)
- Para backup, exporte os dados pela interface (futura funcionalidade)
- Para dados centralizados, considere integração com Google Sheets API
