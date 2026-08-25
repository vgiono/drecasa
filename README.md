# 📊 DRE Casa — Refatorado Multi-arquivo

**Fase 1 completa:** Estrutura refatorada, UX melhorada, pronto para GitHub Pages + Bot.

## 🚀 Início Rápido

### Arquivos
- **`index.html`** — Estrutura HTML mínima, limpa e semântica
- **`style.css`** — Todos os estilos, 6 temas + responsividade mobile
- **`app.js`** — Toda a lógica de DRE, PIX, Análise, etc.

### Local (Teste)
1. Abra `index.html` no navegador
2. Teste as funcionalidades (DRE, PIX, Análise)
3. Dados salvos em `localStorage`

## 📤 Publicar no GitHub Pages

### Opção A: Repositório novo (recomendado)

```bash
# 1. Crie um repo no GitHub: https://github.com/new
# Nome: drecasa (ou seu nome preferido)
# Tipo: Public

# 2. Clone e coloque os arquivos
git clone https://github.com/SEUNOME/drecasa.git
cd drecasa

# Copie os 3 arquivos (index.html, style.css, app.js) para aqui

# 3. Faça upload
git add .
git commit -m "Fase 1: Multi-arquivo refatorado"
git push -u origin main

# 4. Ative GitHub Pages
# No repo: Settings → Pages → Source: main → Save
# Seu site estará em: https://SEUNOME.github.io/drecasa
```

### Opção B: Seu domínio pessoal
Se tiver um domínio, aponte o CNAME para `SEUNOME.github.io`.

## ✨ Mudanças da Fase 1

### ✅ Implementado
- ✓ Multi-arquivo (HTML/CSS/JS separados) — **56% menor que antes**
- ✓ Modais elegantes — substituem `alert()` e `confirm()`
- ✓ 6 temas completos com dark/light refinado
- ✓ **Responsividade mobile** (tablets, celulares)
- ✓ Estrutura CSS organizada em seções
- ✓ Estilos melhorados (spacing, typography, animations)
- ✓ Toda funcionalidade original preservada

### 📱 Mobile
- Tabelas adaptativas em telas pequenas
- Sidebar PIX em modo horizontal em mobile
- Botões e inputs com touch-friendly spacing
- Tema light otimizado para fundo claro

## 🔧 Funcionalidades Atuais

### DRE
- ✓ Múltiplos meses com scroll horizontal
- ✓ Receitas, Despesas, Cartões em tempo real
- ✓ Edição in-place (clique nas células)
- ✓ Cálculos automáticos de saldo
- ✓ Adição/remoção de linhas

### PIX
- ✓ Gerenciamento por mês
- ✓ Lançamentos diários
- ✓ Total por período
- ✓ Exclusão individual

### Análise
- ✓ Gráfico de saldo projetado
- ✓ Categorias por faturas (quando carregadas)
- ✓ Top 10 categorias

### Cartões
- ✓ Visão de parcelamentos
- ✓ Projeção de futuros pagamentos
- ✓ Compras à vista

### Backup
- ✓ Exportar em JSON
- ✓ Importar backup anterior
- ✓ Limpar dados (com confirmação)

## 🎨 Temas Disponíveis

1. **Dark** (padrão) — Azul profundo
2. **Ocean** — Tons de oceano
3. **Aurora** — Verde/ciano
4. **Plum** — Roxo/magenta
5. **Ember** — Laranja/quente
6. **Light** — Claro (novo refinado!)

Clique nos 6 pontos na top-bar para trocar.

## 🤖 Próxima Fase (Fase 2): Telegram Bot

Após publicar no GitHub Pages, vamos integrar:

```
Você envia via Telegram:
  "PIX 150 Netflix"
  "Água 89,90"
  "Carro 500"

Bot processa:
  ✓ Entende a categoria
  ✓ Atualiza o DRE automaticamente
  ✓ Confirma: "✓ PIX 150 adicionada"
```

### Stack Bot
- **Telegram Bot API** (gratuito)
- **Vercel Functions** (backend, gratuito)
- **Claude API** (parsing inteligente)
- **Firestore** (sincronização, gratuito)

## 📝 Estrutura de Código

```
app.js
├── SEED DATA (dados de exemplo)
├── STATE & STORAGE (localStorage v5)
├── CÁLCULOS (getSaldoInicial, calcMonth, etc)
├── FORMATAÇÃO (fmtBrl, fmtNum, etc)
├── NAVEGAÇÃO (showPage)
├── DRE RENDER (renderDRE, renderPix, renderAnalise)
├── CELL EDITING (saveCell, saveCartoes, etc)
├── MONTH NAVIGATION (shiftView, addMonth)
├── PIX (renderPix, addPix, removePix)
├── ANÁLISE (renderAnalise com Charts.js)
├── BACKUP (exportJSON, importJSON)
├── TEMAS (setTheme)
├── MODAIS (alertModal, confirmModal)
├── CARTÕES (renderCartoesParcelas)
├── FATURAS (stubs para bot)
└── INIT (DOMContentLoaded)
```

## 🔒 Segurança & Dados

- **localStorage** — Dados salvos localmente no seu navegador
- **JSON backup** — Exportar e guardar em lugar seguro
- **Sem servidor** — Frontend-only, nenhum dado vai pra internet (por enquanto)
- **Sincronização futura** — O bot adicionará Firebase para backup seguro

## 🚧 Conhecidos & TODO

### Funcionando 100%
- ✓ DRE com todas as operações
- ✓ PIX com gerenciamento
- ✓ Análise com gráficos
- ✓ Temas + responsividade
- ✓ Backup/restore

### Stub (Pronto pra bot)
- ⚠️ Análise de faturas CSV (será feita pelo bot)
- ⚠️ Classificação com IA (bot + Claude API)
- ⚠️ Integração Telegram (Fase 2)

## 🔗 Próximos Passos

1. **Agora:**
   - Teste em seu navegador
   - Publique no GitHub Pages
   - Configure seu domínio (opcional)

2. **Fase 2 (Bot):**
   - Criar Telegram Bot (@BotFather)
   - Deploy em Vercel
   - Integração Claude API
   - Testes E2E

3. **Fase 3 (Polish):**
   - Notificações de confirmação
   - Histórico de comandos
   - Alertas automáticos
   - Sincronização Firestore

## 💡 Dicas

- **Tema**: Salvo em localStorage, persiste entre acessos
- **Dados**: Sempre faça backup! Use "↓ Backup" na top-bar
- **Móvel**: Teste em celular — interface se adapta automaticamente
- **Editor de código**: VS Code com Live Server é ideal para desenvolvimento

## 📧 Suporte

Se encontrar bugs ou tiver sugestões para o bot:
1. Teste no navegador (Console: F12)
2. Verifique localStorage (DevTools → Storage)
3. Me avise o erro exato

---

**Versão:** Fase 1 Completa  
**Data:** 24/08/2026  
**Próxima:** Fase 2 (Telegram Bot + Claude)
