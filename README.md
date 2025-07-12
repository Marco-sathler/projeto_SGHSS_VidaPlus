# 🏥 SGHSS VidaPlus - Sistema Hospitalar Moderno

Um sistema hospitalar completo, responsivo e moderno, desenvolvido com HTML, CSS e JavaScript. O projeto oferece uma experiência de usuário avançada, com recursos de dashboard, gráficos, notificações, chat interno, filtros dinâmicos, responsividade total e muito mais.

## ✨ Funcionalidades Principais

- Alternância entre tema claro e escuro com persistência da preferência
- Notificações inteligentes em tempo real (toast, badges, auto-remoção)
- Filtros avançados e busca dinâmica
- Gráficos interativos com Chart.js
- Chat interno para equipes
- Design 100% responsivo (PC, notebook, tablet, celular)
- Acessibilidade: navegação por teclado, contraste otimizado, suporte a leitores de tela
- Performance otimizada: lazy loading, cache, imagens otimizadas

## 📄 Páginas Disponíveis

- Dashboard (métricas, gráficos, chat, notificações)
- Pacientes (gestão, busca, filtros, histórico, exportação)
- Leitos (controle, status, mapa visual, estatísticas)
- Profissionais (cadastro, especialidades, disponibilidade)
- Agendamento (calendário, confirmações, lembretes)
- Relatórios (personalizados, exportação, análises)
- Telemedicina (sessões virtuais, chat, histórico)
- Configurações (preferências, backup, logs)

## 🛠️ Tecnologias Utilizadas

- **HTML5** (estrutura semântica)
- **CSS3** (variáveis, responsividade, temas)
- **JavaScript ES6+** (interatividade, lógica)
- **Chart.js** (gráficos)
- **Font Awesome** (ícones)
- **Google Fonts** (tipografia)

## 📁 Estrutura do Projeto

```
SGHSS_VidaPlus/
├── index.html
├── teste-responsividade.html
├── paginas/
│   ├── dashboard.html
│   ├── pacientes.html
│   ├── leitos.html
│   ├── profissionais.html
│   ├── agendamento.html
│   ├── relatorios.html
│   ├── telemedicina.html
│   └── configuracoes.html
├── styles/
│   ├── global.css
│   ├── main.css
│   ├── navbar.css
│   ├── components.css
│   ├── responsive.css
│   ├── button-icons.css
│   ├── charts.css
│   ├── chat.css
│   ├── filters.css
│   ├── notifications.css
│   ├── theme.css
├── js/
│   ├── app.js
│   ├── navbar.js
│   ├── charts.js
│   ├── charts-init.js
│   ├── simple-charts.js
│   ├── test-charts.js
│   ├── components.js
│   └── enhanced-app.js
└── README.md
```

## 🚀 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone [url-do-repositorio]
   cd SGHSS_VidaPlus
   ```
2. **Abra o arquivo `index.html`**
   - Recomenda-se usar um servidor local (ex: Live Server no VS Code) para melhor experiência.
3. **Navegue pelo sistema:**
   - Utilize o menu lateral para acessar as páginas.
   - Teste o tema escuro/claro, notificações, filtros e chat.

## 📱 Responsividade

- Layout adaptado para desktop, notebook, tablet e celular
- Menu mobile deslizante
- Elementos touch-friendly
- Teste a responsividade em `teste-responsividade.html`

## 🎨 Personalização

- **Cores:** Edite as variáveis em `styles/global.css`
- **Fontes:** Modifique em `styles/global.css`
- **Layout:** Ajuste em `styles/main.css`, `components.css` e `responsive.css`


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.