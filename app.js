/* ════════════════════════════════════════════════════════════
   DRE CASA - APP.JS
   Lógica principal + Estado + Renderização
   ════════════════════════════════════════════════════════════ */

// ────────────────────────────────────────────────────────────
// SEED DATA (Dados iniciais de exemplo)
// ────────────────────────────────────────────────────────────
const SEED = {
  receitas: [
  { label: 'Saldo Inicial', values: [225017.0, 233481.1, 252552.48, 728407.47, 1224000.0, 1241005.02, 1211381.6, 1228387.76, 1254791.73, 1282999.3, 1313747.77, 1346314.69, 1379489.89] },
  { label: 'Salario 15 Vi', values: [26994.0, 26994.0, 26994.0, 0, 0, 0, 50000.0, 50000.0, 50000.0, 50000.0, 50000.0, 50000.0, 50000.0] },
  { label: 'Salario 30 Vi', values: [20881.0, 20881.0, 20881.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: 'Ferias + 1parc 13', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: 'Bonus + férias', values: [0, 0, 52000.0, 369000.0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: 'Bekatech', values: [27200.0, 27200.0, 27200.0, 150000.0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: 'Vikatech', values: [0, 0, 422000.0, 27300.0, 30000.0, 30000.0, 25000.0, 25000.0, 25000.0, 25000.0, 25000.0, 25000.0, 25000.0] },
  { label: 'Reembolsos SDS/SulAmerica', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: 'Novas Receitas/aplicação', values: [0, 20000.0, 0, 0, 50000.0, 8000.0, 8000.0, 8000.0, 8000.0, 8000.0, 8000.0, 8000.0, 8000.0] },
  ],
  despesas: [
  { label: 'IPTU Sta Monica', values: [0, 0, 0, 7000.0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fixed: false },
  { label: 'Contador', values: [606.96, 404.64, 404.64, 404.64, 404.64, 404.64, 404.64, 404.64, 404.64, 404.64, 404.64, 404.64, 404.64], fixed: false },
  { label: 'imposto vikatech', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fixed: false },
  { label: 'INSS Obra DARF', values: [533.24, 533.24, 533.24, 533.24, 533.24, 533.24, 533.24, 533.24, 533.24, 533.24, 533.24, 533.24, 533.24], fixed: false },
  { label: 'móveis/Adelmo- Out/Novembro', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fixed: false },
  { label: 'Carro', values: [6196.29, 6196.29, 6196.29, 6196.29, 6196.29, 6196.29, 6196.29, 6196.29, 6196.29, 6196.29, 6196.29, 6196.29, 6196.29], fixed: true },
  { label: 'IPVA', values: [2273.35, 7200.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fixed: false },
  { label: 'Jardim', values: [0, 600.0, 600.0, 0, 600.0, 600.0, 600.0, 600.0, 600.0, 600.0, 600.0, 600.0, 600.0], fixed: false },
  { label: 'St Monica - Cond', values: [1135.0, 1129.14, 1129.14, 1129.14, 1129.14, 1129.14, 1129.14, 1129.14, 1129.14, 1129.14, 1129.14, 1129.14, 1129.14], fixed: false },
  { label: 'Cpfl - St Monica', values: [250.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0], fixed: false },
  { label: 'Azza', values: [103.0, 103.0, 103.0, 103.0, 103.0, 103.0, 103.0, 103.0, 103.0, 103.0, 103.0, 103.0, 103.0], fixed: false },
  { label: 'Provisão Cartão', values: [0, 0, 0, 0, 0, 0, 20000, 20000, 20000, 20000, 20000, 20000, 20000], fixed: false },
  { label: 'Financ Caixa', values: [9294.0, 9295.0, 9296.0, 9297.0, 9298.0, 9299.0, 9300.0, 9301.0, 9302.0, 9303.0, 9304.0, 9305.0, 9306.0], fixed: false },
  { label: 'Plano de Saúde', values: [0.0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fixed: false },
  { label: 'Faxina', values: [2000.0, 4000.0, 4000.0, 4000.0, 4000.0, 4000.0, 4000.0, 4000.0, 4000.0, 4000.0, 4000.0, 4000.0, 4000.0], fixed: false },
  { label: 'Babá/escolinha', values: [1000.0, 2500.0, 2500.0, 2500.0, 2500.0, 2500.0, 2500.0, 2500.0, 2500.0, 2500.0, 2500.0, 2500.0, 2500.0], fixed: false },
  { label: 'Piscina', values: [270.0, 270.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0], fixed: false },
  { label: 'Festa Beni', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fixed: false },
  ],
  cartoesByMonth_seed: {},
  pix: [
  { mes: 'Maio 2025', dia: 2, valor: 56.0, descricao: 'Venenos' },
  { mes: 'Fevereiro 2025', dia: 3, valor: 4000.0, descricao: 'Conta Karen' },
  { mes: 'Dezembro 2024', dia: 4, valor: 364.69, descricao: 'Thor' },
  { mes: 'Dezembro 2024', dia: 5, valor: 550.0, descricao: 'terra/venenos' },
  { mes: 'Fevereiro 2025', dia: 5, valor: 268.0, descricao: 'Babá' },
  { mes: 'Janeiro 2025', dia: 6, valor: 14.03, descricao: 'Barão supermercado' },
  { mes: 'Marco 2025', dia: 6, valor: 3000.0, descricao: 'Karen' },
  { mes: 'Novembro 2024', dia: 7, valor: 392.25, descricao: 'CPFL Outubro' },
  { mes: 'Dezembro 2024', dia: 7, valor: 40716.0, descricao: 'Edmilsso' },
  { mes: 'Janeiro 2025', dia: 7, valor: 530.0, descricao: 'Ademar' },
  { mes: 'Fevereiro 2025', dia: 7, valor: 130.0, descricao: 'Ademar - Venenos' },
  { mes: 'Marco 2025', dia: 7, valor: 190.0, descricao: 'Venenos' },
  { mes: 'Janeiro 2025', dia: 8, valor: 400.0, descricao: 'Ana Pediatra' },
  { mes: 'Abril 2025', dia: 8, valor: 240.0, descricao: 'certificado empresa' },
  { mes: 'Janeiro 2025', dia: 9, valor: 150.0, descricao: 'Carina' },
  { mes: 'Setembro 2025', dia: 9, valor: 7000.0, descricao: 'Adelmo' },
  { mes: 'Dezembro 2024', dia: 10, valor: 460.6, descricao: 'Tainá foto' },
  { mes: 'Abril 2025', dia: 10, valor: 4000.0, descricao: 'Conta Karen' },
  { mes: 'Fevereiro 2025', dia: 11, valor: 1500.0, descricao: 'Karen' },
  { mes: 'Novembro 2024', dia: 12, valor: 3203.0, descricao: 'Averbação Cartório' },
  { mes: 'Dezembro 2024', dia: 12, valor: 3500.0, descricao: 'Carina' },
  { mes: 'Marco 2025', dia: 12, valor: 704.6, descricao: 'Dr Piscinas' },
  { mes: 'Abril 2025', dia: 12, valor: 300.0, descricao: 'limpeza carro' },
  { mes: 'Junho 2025', dia: 13, valor: 365.0, descricao: 'açougue' },
  { mes: 'Novembro 2024', dia: 14, valor: 168.0, descricao: 'Ademar terra/Adubo' },
  { mes: 'Janeiro 2025', dia: 15, valor: 153.0, descricao: 'Armazem Agricola (Venenos/Mangueiras)' },
  { mes: 'Abril 2025', dia: 15, valor: 81.99, descricao: 'bateria' },
  { mes: 'Outubro 2024', dia: 16, valor: 145.0, descricao: 'Ademar, adubos/Veneno' },
  { mes: 'Dezembro 2024', dia: 16, valor: 27000.0, descricao: '2a Parcela Dan' },
  { mes: 'Janeiro 2025', dia: 16, valor: 5.64, descricao: 'Barao mercado' },
  { mes: 'Outubro 2024', dia: 17, valor: 5762.37, descricao: 'Habite-se Itupeva' },
  { mes: 'Janeiro 2025', dia: 17, valor: 150.0, descricao: 'Leandro (Frete)' },
  { mes: 'Outubro 2024', dia: 18, valor: 80.0, descricao: 'Pix Lucinha' },
  { mes: 'Dezembro 2024', dia: 18, valor: 400.0, descricao: 'Pediatra' },
  { mes: 'Janeiro 2025', dia: 18, valor: 2500.0, descricao: 'Vila das carnes' },
  { mes: 'Fevereiro 2025', dia: 18, valor: 350.0, descricao: 'Odonto Beni' },
  { mes: 'Outubro 2024', dia: 19, valor: 1000.0, descricao: 'Pix Pintor Muro' },
  { mes: 'Dezembro 2024', dia: 19, valor: 233.05, descricao: 'Material Piscina' },
  { mes: 'Janeiro 2025', dia: 19, valor: 5.61, descricao: 'Barao mercado' },
  { mes: 'Fevereiro 2025', dia: 19, valor: 165.2, descricao: 'Venenos Ademar' },
  { mes: 'Janeiro 2025', dia: 20, valor: 150.0, descricao: 'Porta - Marcus' },
  { mes: 'Novembro 2024', dia: 21, valor: 370.74, descricao: 'lunch Y' },
  { mes: 'Janeiro 2025', dia: 21, valor: 25.0, descricao: 'L brandão' },
  { mes: 'Outubro 2024', dia: 22, valor: 500.0, descricao: 'Dedetização' },
  { mes: 'Janeiro 2025', dia: 22, valor: 278.92, descricao: 'Pai (Bolo)' },
  { mes: 'Agosto 2025', dia: 22, valor: 190.0, descricao: 'Ademar' },
  { mes: 'Dezembro 2024', dia: 23, valor: 318.6, descricao: 'presente mae' },
  { mes: 'Junho 2025', dia: 23, valor: 218.0, descricao: 'TecFiltros' },
  { mes: 'Novembro 2024', dia: 25, valor: 317.0, descricao: 'Limpeza' },
  { mes: 'Fevereiro 2025', dia: 25, valor: 315.0, descricao: 'Dentista' },
  { mes: 'Novembro 2024', dia: 26, valor: 400.0, descricao: 'Pediatra' },
  { mes: 'Agosto 2025', dia: 26, valor: 270.0, descricao: 'Pomar' },
  { mes: 'Fevereiro 2025', dia: 27, valor: 1879.0, descricao: 'porta' },
  { mes: 'Marco 2025', dia: 27, valor: 800.0, descricao: 'Adelmo - Motores' },
  { mes: 'Fevereiro 2025', dia: 28, valor: 400.0, descricao: 'mir' },
  { mes: 'Novembro 2024', dia: 29, valor: 233.05, descricao: 'Material Piscina' },
  { mes: 'Abril 2025', dia: 29, valor: 420.57, descricao: 'Pix Vikatech' },
  { mes: 'Dezembro 2024', dia: 30, valor: 701.52, descricao: 'Lumi restaurante' },
  { mes: 'Outubro 2024', dia: 31, valor: 1000.0, descricao: 'Pintor Muro' },
  ],
  faturas_hist: {},
  si_overrides: {},
};


const MONTHS_ORDER = [
  'Dezembro 2025', 'Janeiro 2026', 'Fevereiro 2026', 'Marco 2026', 'Abril 2026',
  'Maio 2026', 'Junho 2026', 'Julho 2026', 'Agosto 2026', 'Setembro 2026',
  'Outubro 2026', 'Novembro 2026', 'Dezembro 2026',
];

const MONTH_LABELS = {
  'Janeiro':'Jan', 'Fevereiro':'Fev', 'Marco':'Mar', 'Abril':'Abr', 'Maio':'Mai',
  'Junho':'Jun', 'Julho':'Jul', 'Agosto':'Ago', 'Setembro':'Set', 'Outubro':'Out',
  'Novembro':'Nov', 'Dezembro':'Dez'
};

// ────────────────────────────────────────────────────────────
// STATE & STORAGE
// ────────────────────────────────────────────────────────────
let state = loadState();
let viewStart = 0;
let visibleCols = 6;
let pixMonth = null;
let charts = {};

// Modal state
let modalAction = null;

function loadState() {
  const s = localStorage.getItem('drecasa_v5');
  if (s) {
    try { return JSON.parse(s); }
    catch (e) { console.error('Erro ao carregar estado:', e); }
  }
  return buildInitialState();
}

function buildInitialState() {
  const months = [...MONTHS_ORDER];
  const dre = {};

  for (const m of months) {
    dre[m] = { receitas: [], despesas: [] };
  }

  // Popula com dados de exemplo
  for (let ci = 0; ci < MONTHS_ORDER.length; ci++) {
    const mn = MONTHS_ORDER[ci];
    dre[mn].receitas = SEED.receitas
      .filter(r => r.label !== 'Saldo Inicial')
      .map(r => ({ label: r.label, value: r.values[ci] ?? null }));
    dre[mn].despesas = SEED.despesas
      .map(d => ({ label: d.label, value: d.values[ci] ?? null, fixed: d.fixed || false }));
  }

  return {
    months,
    dre,
    cartoesByMonth: { ...SEED.cartoesByMonth_seed },
    pix: buildPixFromSeed(),
    faturas: SEED.faturas_hist || {},
    fatura_lancamentos: [],
    fatura_cards: [],
    siOverrides: SEED.si_overrides || {},
  };
}

function buildPixFromSeed() {
  const pix = {};
  for (const p of SEED.pix) {
    if (!pix[p.mes]) pix[p.mes] = [];
    pix[p.mes].push({ dia: p.dia, valor: p.valor, descricao: p.descricao });
  }
  return pix;
}

function saveState() {
  localStorage.setItem('drecasa_v5', JSON.stringify(state));
  showSaveIndicator();
}

function showSaveIndicator() {
  const el = document.getElementById('badge-save');
  if (!el) return;
  el.style.display = 'inline';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.display = 'none'; }, 2000);
}

// ────────────────────────────────────────────────────────────
// CÁLCULOS
// ────────────────────────────────────────────────────────────
function getSaldoInicial(mn) {
  if (state.siOverrides[mn] !== undefined) return state.siOverrides[mn];
  const idx = state.months.indexOf(mn);
  if (idx <= 0) {
    const r = SEED.receitas.find(r => r.label === 'Saldo Inicial');
    return r ? r.values[0] : 0;
  }
  const prev = state.months[idx - 1];
  const { totalRec, totalDesp } = calcMonth(prev);
  return getSaldoInicial(prev) + totalRec - totalDesp;
}

function calcMonth(mn) {
  const d = state.dre[mn] || { receitas: [], despesas: [] };
  const totalRec = (d.receitas || []).reduce((s, r) => s + (r.value || 0), 0);
  const cartoes = state.cartoesByMonth[mn] || 0;
  const despRows = (d.despesas || []).reduce((s, d2) => s + (d2.value || 0), 0);
  const totalDesp = despRows + cartoes;
  return { totalRec, totalDesp, cartoes };
}

function getSaldoFinal(mn) {
  const si = getSaldoInicial(mn);
  const { totalRec, totalDesp } = calcMonth(mn);
  return si + totalRec - totalDesp;
}

// ────────────────────────────────────────────────────────────
// FORMATAÇÃO
// ────────────────────────────────────────────────────────────
function fmtBrl(v) {
  if (v == null || isNaN(v)) return '—';
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtNum(v) {
  if (v == null) return '';
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtShortMonth(m) {
  const [nome, ano] = m.split(' ');
  return (MONTH_LABELS[nome] || nome) + '/' + (ano || '').slice(2);
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ────────────────────────────────────────────────────────────
// NAVEGAÇÃO
// ────────────────────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  const page = document.getElementById('page-' + id);
  const btn = document.querySelector(`.nav-btn[onclick="showPage('${id}')"]`);
  
  if (page) page.classList.add('active');
  if (btn) btn.classList.add('active');

  if (id === 'pix') renderPix();
  if (id === 'analise') renderAnalise();
  if (id === 'faturas') restoreFaturas();
  if (id === 'cartoes-tab') renderCartoesParcelas();
}

// ────────────────────────────────────────────────────────────
// DRE RENDER
// ────────────────────────────────────────────────────────────
function renderDRE() {
  const visible = state.months.slice(viewStart, viewStart + visibleCols);
  
  document.getElementById('mnav-label').textContent = visible.length
    ? fmtShortMonth(visible[0]) + ' → ' + fmtShortMonth(visible[visible.length - 1])
    : '';

  // Mês atual
  const today = new Date();
  const monthNames = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const curMn = monthNames[today.getMonth()] + ' ' + today.getFullYear();
  const curMnState = state.months.includes(curMn) ? curMn : state.months[state.months.length - 1];

  const { totalRec, totalDesp } = calcMonth(curMnState);
  const sf = getSaldoFinal(curMnState);

  // Summary
  document.getElementById('dre-summary').innerHTML = `
    <div class="sum-card">
      <div class="sum-label">Saldo Final</div>
      <div class="sum-value ${sf >= 0 ? 'green' : 'red'}">${fmtBrl(sf)}</div>
      <div class="sum-sub">${fmtShortMonth(curMnState)}</div>
    </div>
    <div class="sum-card">
      <div class="sum-label">Receitas</div>
      <div class="sum-value blue">${fmtBrl(totalRec)}</div>
      <div class="sum-sub">${fmtShortMonth(curMnState)}</div>
    </div>
    <div class="sum-card">
      <div class="sum-label">Despesas</div>
      <div class="sum-value red">${fmtBrl(totalDesp)}</div>
      <div class="sum-sub">${fmtShortMonth(curMnState)}</div>
    </div>
  `;

  // Tabela
  let html = '<thead><tr><th>Categoria</th>';
  for (const m of visible) html += `<th>${fmtShortMonth(m)}</th>`;
  html += '</tr></thead><tbody>';

  // ── RECEITAS ──
  html += `<tr class="row-section"><td colspan="${visible.length + 1}">Receitas</td></tr>`;

  // Saldo Inicial
  html += `<tr>`;
  html += `<td style="padding:0 10px;color:var(--text2)">Saldo Inicial</td>`;
  for (const m of visible) {
    const v = getSaldoInicial(m);
    const isOvr = state.siOverrides[m] !== undefined;
    html += `<td><span class="cell-val ${isOvr ? 'override' : ''}" 
      contenteditable="true"
      onblur="saveSaldoInicial('${m}',this)"
      onfocus="this.classList.add('editing')"
      onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}"
      >${fmtNum(v)}</span></td>`;
  }
  html += '</tr>';

  // Receitas
  const recLabels = getUniqueLabels(visible, 'receitas');
  for (const lbl of recLabels) {
    html += `<tr data-section="receitas" data-label="${escHtml(lbl)}">
      <td style="padding:0 10px">
        <button class="btn-remove" onclick="removeRow('receitas','${escHtml(lbl)}')">✕</button>
        <span ondblclick="renameRow('receitas','${escHtml(lbl)}')" style="cursor:pointer">${escHtml(lbl)}</span>
      </td>`;
    for (const m of visible) {
      const row = (state.dre[m]?.receitas || []).find(r => r.label === lbl);
      html += `<td><span class="cell-val" contenteditable="true"
        onblur="saveCell('receitas','${escHtml(lbl)}','${m}',this)"
        onfocus="this.classList.add('editing')"
        onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}"
        >${row?.value != null ? fmtNum(row.value) : ''}</span></td>`;
    }
    html += '</tr>';
  }

  html += `<tr class="row-add"><td colspan="${visible.length + 1}">
    <button class="btn-add-row" onclick="addRow('receitas')">+ receita</button></td></tr>`;

  // Total Caixa
  html += `<tr class="row-total"><td>Total Caixa</td>`;
  for (const m of visible) {
    const si = getSaldoInicial(m);
    const t = (state.dre[m]?.receitas || []).reduce((s, r) => s + (r.value || 0), 0);
    html += `<td><span class="cell-val" style="color:var(--accent)">${fmtBrl(si + t)}</span></td>`;
  }
  html += '</tr>';

  // ── DESPESAS ──
  html += `<tr class="row-section"><td colspan="${visible.length + 1}">Despesas</td></tr>`;

  const despLabels = getUniqueLabels(visible, 'despesas');
  for (const lbl of despLabels) {
    const isFixed = visible.some(m => (state.dre[m]?.despesas || []).find(d => d.label === lbl && d.fixed));
    html += `<tr data-section="despesas" data-label="${escHtml(lbl)}">
      <td style="padding:0 10px">
        <button class="btn-remove" onclick="removeRow('despesas','${escHtml(lbl)}')">✕</button>
        <span ondblclick="renameRow('despesas','${escHtml(lbl)}')" style="cursor:pointer">${escHtml(lbl)}</span>
        ${isFixed ? '<span class="tag-fixo">fixo</span>' : ''}
      </td>`;
    for (const m of visible) {
      const row = (state.dre[m]?.despesas || []).find(d => d.label === lbl);
      html += `<td><span class="cell-val" contenteditable="true"
        onblur="saveCell('despesas','${escHtml(lbl)}','${m}',this)"
        onfocus="this.classList.add('editing')"
        onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}"
        >${row?.value != null ? fmtNum(row.value) : ''}</span></td>`;
    }
    html += '</tr>';
  }

  // Cartões
  html += `<tr class="row-cartoes"><td style="padding:0 10px">Cartões</td>`;
  for (const m of visible) {
    const v = state.cartoesByMonth[m] ?? null;
    html += `<td><span class="cell-val" contenteditable="true"
      onblur="saveCartoes('${m}',this)"
      onfocus="this.classList.add('editing')"
      onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}"
      >${v != null ? fmtNum(v) : ''}</span></td>`;
  }
  html += '</tr>';

  html += `<tr class="row-add"><td colspan="${visible.length + 1}">
    <button class="btn-add-row" onclick="addRow('despesas')">+ despesa</button></td></tr>`;

  // Total Despesas
  html += `<tr class="row-total"><td>Total Despesas</td>`;
  for (const m of visible) {
    const t = (state.dre[m]?.despesas || []).reduce((s, d) => s + (d.value || 0), 0) + (state.cartoesByMonth[m] || 0);
    html += `<td><span class="cell-val" style="color:var(--red)">${fmtBrl(t)}</span></td>`;
  }
  html += '</tr>';

  // Saldo Final
  html += `<tr class="row-saldo"><td>Saldo Final</td>`;
  for (const m of visible) {
    const sf = getSaldoFinal(m);
    html += `<td><span class="cell-val ${sf >= 0 ? 'positive' : 'negative'}">${fmtBrl(sf)}</span></td>`;
  }
  html += '</tr></tbody>';

  document.getElementById('dre-table').innerHTML = html;
}

function getUniqueLabels(months, section) {
  const seen = new Set(), labels = [];
  for (const m of months) {
    for (const r of (state.dre[m]?.[section] || [])) {
      if (!seen.has(r.label)) {
        seen.add(r.label);
        labels.push(r.label);
      }
    }
  }
  return labels;
}

// ────────────────────────────────────────────────────────────
// DRE CELL EDITING
// ────────────────────────────────────────────────────────────
function parseVal(v) {
  const s = v.trim().replace(/\./g, '').replace(',', '.');
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function saveSaldoInicial(mn, el) {
  el.classList.remove('editing');
  const v = parseVal(el.textContent);
  if (v !== null) state.siOverrides[mn] = v;
  else delete state.siOverrides[mn];
  el.textContent = fmtNum(getSaldoInicial(mn));
  saveState();
  renderDRE();
}

function saveCell(section, label, mn, el) {
  el.classList.remove('editing');
  const val = parseVal(el.textContent);
  if (!state.dre[mn]) state.dre[mn] = { receitas: [], despesas: [] };
  const arr = state.dre[mn][section];
  const idx = arr.findIndex(r => r.label === label);
  if (idx >= 0) arr[idx].value = val;
  else arr.push({ label, value: val, fixed: false });
  el.textContent = val != null ? fmtNum(val) : '';
  saveState();
  renderDRE();
}

function saveCartoes(mn, el) {
  el.classList.remove('editing');
  const v = parseVal(el.textContent);
  state.cartoesByMonth[mn] = v;
  el.textContent = v != null ? fmtNum(v) : '';
  saveState();
  renderDRE();
}

function addRow(section) {
  const label = promptModal(`Nome da ${section === 'receitas' ? 'receita' : 'despesa'}:`);
  if (!label) return;
  const visible = state.months.slice(viewStart, viewStart + visibleCols);
  for (const m of visible) {
    if (!state.dre[m]) state.dre[m] = { receitas: [], despesas: [] };
    if (!state.dre[m][section].find(r => r.label === label)) {
      state.dre[m][section].push({ label, value: null, fixed: false });
    }
  }
  saveState();
  renderDRE();
}

function removeRow(section, label) {
  confirmModal(`Remover "${label}" dos meses visíveis?`, () => {
    for (const m of state.months.slice(viewStart, viewStart + visibleCols)) {
      if (state.dre[m]?.[section]) {
        state.dre[m][section] = state.dre[m][section].filter(r => r.label !== label);
      }
    }
    saveState();
    renderDRE();
  });
}

function renameRow(section, oldLabel) {
  const newLabel = promptModal('Novo nome:', oldLabel);
  if (!newLabel || newLabel.trim() === oldLabel) return;
  const nl = newLabel.trim();
  state.months.forEach(mn => {
    const rows = state.dre[mn]?.[section] || [];
    const row = rows.find(r => r.label === oldLabel);
    if (row) row.label = nl;
  });
  saveState();
  renderDRE();
}

// ────────────────────────────────────────────────────────────
// MONTH NAVIGATION
// ────────────────────────────────────────────────────────────
function shiftView(d) {
  viewStart = Math.max(0, Math.min(state.months.length - visibleCols, viewStart + d));
  renderDRE();
}

function setVisibleCols(n) {
  visibleCols = n;
  viewStart = Math.max(0, state.months.length - n);
  renderDRE();
}

function showAllMonths() {
  visibleCols = state.months.length;
  viewStart = 0;
  renderDRE();
}

function addMonth() {
  const last = state.months[state.months.length - 1];
  const next = getNextMonth(last);
  if (state.months.includes(next)) return;
  state.months.push(next);
  const prev = state.dre[last] || { receitas: [], despesas: [] };
  state.dre[next] = {
    receitas: (prev.receitas || []).map(r => ({ ...r })),
    despesas: (prev.despesas || []).map(d => ({ ...d }))
  };
  saveState();
  renderDRE();
}

function getNextMonth(mn) {
  const [nome, ano] = mn.split(' ');
  const meses = Object.keys(MONTH_LABELS);
  const idx = meses.indexOf(nome);
  if (idx === -1) return mn;
  if (idx === 11) return meses[0] + ' ' + (parseInt(ano) + 1);
  return meses[idx + 1] + ' ' + ano;
}

// ────────────────────────────────────────────────────────────
// PIX
// ────────────────────────────────────────────────────────────
function renderPix() {
  const months = Object.keys(state.pix).sort((a, b) => MONTHS_ORDER.indexOf(b) - MONTHS_ORDER.indexOf(a));
  if (!pixMonth || !months.includes(pixMonth)) pixMonth = months[0] || null;

  document.getElementById('pix-sidebar').innerHTML =
    months.map(m => {
      const t = (state.pix[m] || []).reduce((s, p) => s + p.valor, 0);
      return `<div class="pix-month-item ${m === pixMonth ? 'active' : ''}" onclick="selPixMonth('${m}')">
        <span>${fmtShortMonth(m)}</span>
        <span class="pix-month-total">${fmtBrl(t)}</span>
      </div>`;
    }).join('') +
    `<div class="pix-month-item" onclick="newPixMonth()" style="color:var(--accent)">+ Novo</div>`;

  renderPixContent();
}

function selPixMonth(m) {
  pixMonth = m;
  renderPix();
}

function newPixMonth() {
  const mn = promptModal('Nome do mês (ex: Janeiro 2026):');
  if (!mn) return;
  if (!state.pix[mn]) state.pix[mn] = [];
  pixMonth = mn;
  saveState();
  renderPix();
}

function renderPixContent() {
  const mn = pixMonth;
  const el = document.getElementById('pix-content');
  if (!mn) {
    el.innerHTML = '<p style="color:var(--text3);padding:20px">Selecione um mês</p>';
    return;
  }
  const items = (state.pix[mn] || []).slice().sort((a, b) => a.dia - b.dia);
  const total = items.reduce((s, p) => s + p.valor, 0);
  el.innerHTML = `
    <div class="pix-header">
      <div class="pix-title">${mn}</div>
      <div class="pix-total-badge">R$ ${fmtBrl(total)}</div>
    </div>
    <div class="pix-form">
      <input class="form-input w-date" id="p-dia" type="number" min="1" max="31" placeholder="Dia">
      <input class="form-input w-val" id="p-val" type="text" placeholder="Valor">
      <input class="form-input w-desc" id="p-desc" type="text" placeholder="Descrição"
        onkeydown="if(event.key==='Enter')addPix()">
      <button class="btn-small primary" onclick="addPix()">+ Lançar</button>
    </div>
    <div class="pix-list">
      ${items.map((p, i) => `
        <div class="pix-item">
          <span class="pix-dia">${p.dia}</span>
          <span class="pix-desc">${escHtml(p.descricao)}</span>
          <span class="pix-val">R$ ${fmtBrl(p.valor)}</span>
          <button class="pix-del" onclick="removePix('${mn}',${i})">✕</button>
        </div>`).join('')}
    </div>`;
}

function addPix() {
  const dia = parseInt(document.getElementById('p-dia').value);
  const val = parseVal(document.getElementById('p-val').value);
  const desc = document.getElementById('p-desc').value.trim();
  if (!dia || !val || !desc) {
    alertModal('Preencha todos os campos');
    return;
  }
  if (!state.pix[pixMonth]) state.pix[pixMonth] = [];
  state.pix[pixMonth].push({ dia, valor: val, descricao: desc });
  document.getElementById('p-dia').value = '';
  document.getElementById('p-val').value = '';
  document.getElementById('p-desc').value = '';
  saveState();
  renderPixContent();
}

function removePix(mn, i) {
  confirmModal(`Remover "${state.pix[mn][i].descricao}"?`, () => {
    state.pix[mn].splice(i, 1);
    saveState();
    renderPixContent();
  });
}

// ────────────────────────────────────────────────────────────
// ANÁLISE (CHARTS)
// ────────────────────────────────────────────────────────────
function renderAnalise() {
  const grid = document.getElementById('analise-grid');
  
  // Agregação de categorias de cartões
  const catTotals = {};
  for (const ml of (state.fatura_lancamentos || [])) {
    const cat = ml.cat || 'Outros';
    catTotals[cat] = (catTotals[cat] || 0) + ml.val;
  }
  const catE = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);

  // Saldo projetado
  const dreMs = state.months.filter(m =>
    state.dre[m] && ((state.dre[m].receitas || []).some(r => r.value) || (state.dre[m].despesas || []).some(d => d.value))
  );
  const saldoL = dreMs.map(fmtShortMonth);
  const saldoV = dreMs.map(m => Math.round(getSaldoFinal(m)));

  grid.innerHTML = `
    <div class="chart-card full">
      <div class="chart-title">Saldo projetado mês a mês</div>
      <div class="chart-wrap tall"><canvas id="ch-saldo"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-title">Por categoria — histórico</div>
      <div class="chart-wrap"><canvas id="ch-pie"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-title">Top 10 categorias</div>
      <div class="chart-wrap"><canvas id="ch-bar"></canvas></div>
    </div>`;

  setTimeout(() => {
    const chartOpts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#7c8fa8', font: { size: 11 } } } }
    };
    const ttBrl = { callbacks: { label: ctx => ' R$ ' + fmtBrl(ctx.raw) } };

    charts.saldo = new Chart(document.getElementById('ch-saldo'), {
      type: 'line',
      data: {
        labels: saldoL,
        datasets: [{
          data: saldoV,
          borderColor: '#4ade80',
          backgroundColor: 'rgba(74, 222, 128, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 3,
          label: 'Saldo Final'
        }]
      },
      options: {
        ...chartOpts,
        plugins: { ...chartOpts.plugins, tooltip: ttBrl },
        scales: {
          x: { ticks: { color: '#7c8fa8', font: { size: 10 } } },
          y: { ticks: { color: '#7c8fa8', callback: v => 'R$' + Math.round(v / 1000) + 'k' }, grid: { color: 'var(--border2)' } }
        }
      }
    });

    if (catE.length) {
      const COLS = ['#3b82f6','#22c55e','#f59e0b','#ef4444','#a78bfa','#06b6d4','#f97316','#84cc16','#ec4899','#14b8a6'];
      
      charts.pie = new Chart(document.getElementById('ch-pie'), {
        type: 'doughnut',
        data: {
          labels: catE.map(e => e[0]),
          datasets: [{ data: catE.map(e => Math.round(e[1])), backgroundColor: COLS, borderWidth: 0 }]
        },
        options: { ...chartOpts, plugins: { legend: { position: 'right', labels: { color: '#7c8fa8', font: { size: 10 }, boxWidth: 10 } }, tooltip: ttBrl } }
      });

      charts.bar = new Chart(document.getElementById('ch-bar'), {
        type: 'bar',
        data: {
          labels: catE.slice(0, 10).map(e => e[0]),
          datasets: [{ data: catE.slice(0, 10).map(e => Math.round(e[1])), backgroundColor: COLS, borderRadius: 4, label: 'R$' }]
        },
        options: { ...chartOpts, indexAxis: 'y', plugins: { ...chartOpts.plugins, tooltip: ttBrl }, scales: { x: { ticks: { color: '#7c8fa8', callback: v => 'R$' + Math.round(v / 1000) + 'k' }, grid: { color: 'var(--border2)' } }, y: { ticks: { color: '#7c8fa8', font: { size: 10 } } } } }
      });
    }
  }, 100);
}

// ────────────────────────────────────────────────────────────
// BACKUP & IMPORT
// ────────────────────────────────────────────────────────────
function exportJSON() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }));
  a.download = 'drecasa_' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
}

function importJSON() {
  document.getElementById('import-file').click();
}

function doImport(e) {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    try {
      state = JSON.parse(ev.target.result);
      saveState();
      renderDRE();
      alertModal('✓ Dados restaurados com sucesso!');
    } catch (err) {
      alertModal('✗ Arquivo inválido.');
    }
  };
  r.readAsText(f);
}

function clearAllData() {
  confirmModal('⚠️ Apagar TODOS os dados e recarregar? Isso não pode ser desfeito!', () => {
    localStorage.removeItem('drecasa_v5');
    location.reload();
  });
}

// ────────────────────────────────────────────────────────────
// TEMAS
// ────────────────────────────────────────────────────────────
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('drecasa_theme', t);
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.style.outline = 'none';
  });
  const btn = document.querySelector(`[onclick="setTheme('${t}')"]`);
  if (btn) btn.style.outline = '2px solid var(--accent)';
}

(function() {
  const saved = localStorage.getItem('drecasa_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

// ────────────────────────────────────────────────────────────
// MODAIS (Substituem alert/confirm)
// ────────────────────────────────────────────────────────────
function alertModal(msg) {
  document.getElementById('alert-body').textContent = msg;
  document.getElementById('modal-alert').style.display = 'flex';
}

function closeAlert() {
  document.getElementById('modal-alert').style.display = 'none';
}

function confirmModal(msg, onConfirm) {
  document.getElementById('modal-title').textContent = 'Confirmar';
  document.getElementById('modal-body').textContent = msg;
  document.getElementById('modal-confirm').style.display = 'flex';
  modalAction = onConfirm;
}

function confirmModalAction() {
  if (modalAction) modalAction();
  closeModal();
}

function closeModal() {
  document.getElementById('modal-confirm').style.display = 'none';
  modalAction = null;
}

function promptModal(msg, defaultVal = '') {
  const input = prompt(msg, defaultVal);
  return input;
}

// ────────────────────────────────────────────────────────────
// CARTÕES / PARCELAMENTOS
// ────────────────────────────────────────────────────────────
function renderCartoesParcelas() {
  const lanc = state.fatura_lancamentos || [];
  if (!lanc.length) {
    document.getElementById('cartoes-summary').innerHTML = '<div style="color:var(--text3);font-size:13px;padding:8px 0">Nenhuma fatura carregada. Vá em <b>Faturas</b>.</div>';
    document.getElementById('cartoes-table').innerHTML = '';
    return;
  }

  const parcelados = lanc.filter(l => l.pa && l.pt && l.val > 0);
  const avista = lanc.filter(l => (!l.pa || !l.pt) && l.val > 0);

  const map = {};
  parcelados.forEach(l => {
    const key = (l.date || '') + '|' + (l.desc || '').toLowerCase() + '|' + Math.round(l.val) + '|' + l.pt;
    if (!map[key] || l.pa < map[key].pa) map[key] = l;
  });
  const unique = Object.values(map).sort((a, b) => b.val * (b.pt - b.pa + 1) - a.val * (a.pt - a.pa + 1));

  const totalParc = unique.reduce((s, l) => s + l.val * (l.pt - l.pa + 1), 0);
  const totalMes = unique.reduce((s, l) => s + l.val, 0);
  const totalAvista = avista.reduce((s, l) => s + l.val, 0);
  const totalFatura = lanc.reduce((s, l) => s + (l.val || 0), 0);

  document.getElementById('cartoes-summary').innerHTML = `
    <div class="sum-card"><div class="sum-label">Parcelados</div><div class="sum-value">${unique.length}</div></div>
    <div class="sum-card"><div class="sum-label">Compromisso futuro</div><div class="sum-value red">${fmtBrl(totalParc)}</div><div class="sum-sub">total restante</div></div>
    <div class="sum-card"><div class="sum-label">Parcelas do mês</div><div class="sum-value">${fmtBrl(totalMes)}</div></div>
    <div class="sum-card"><div class="sum-label">À vista</div><div class="sum-value">${fmtBrl(totalAvista)}</div></div>
    <div class="sum-card" style="border-color:rgba(74,222,128,0.3)"><div class="sum-label" style="color:var(--green)">Total fatura</div><div class="sum-value" style="color:var(--green)">${fmtBrl(totalFatura)}</div></div>`;

  const today = new Date();
  const months = [];
  for (let i = 0; i <= 12; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const mIdx = d.getMonth();
    const mYear = d.getFullYear();
    months.push({ idx: i, label: fmtShortMonth(Object.keys(MONTH_LABELS)[mIdx] + ' ' + mYear) });
  }

  let html = '<thead><tr><th>Descrição</th>';
  for (const m of months) html += `<th>${m.label}</th>`;
  html += '</tr></thead><tbody>';

  for (const l of unique) {
    html += `<tr><td><span style="color:var(--text2);font-size:12px">${escHtml(l.desc)}</span></td>`;
    for (const m of months) {
      const show = m.idx <= l.pt - l.pa ? `R$ ${fmtBrl(l.val)}` : '—';
      html += `<td style="text-align:right;color:var(--text2);font-size:11px">${show}</td>`;
    }
    html += '</tr>';
  }

  html += '</tbody>';
  document.getElementById('cartoes-table').innerHTML = html;
}

// ────────────────────────────────────────────────────────────
// FATURAS (Stub for now)
// ────────────────────────────────────────────────────────────
function restoreFaturas() {
  if (!state.fatura_lancamentos || !state.fatura_lancamentos.length) return;
  document.getElementById('ft-results').classList.remove('hidden');
}

function ft_processAll() {
  alertModal('Funcionalidade de upload de faturas será integrada com o bot.');
}

function ft_classifyAllWithAI() {
  alertModal('Classificação com IA será integrada com o bot.');
}

function ft_sendToDRE() {
  alertModal('Integração com bot será adicionada em breve.');
}

function ft_sendAnalysis() {
  alertModal('Chat com IA será integrado com o bot.');
}

function ft_resetUpload() {
  document.getElementById('ft-upload-wrap').style.display = 'block';
  document.getElementById('ft-back-btn').style.display = 'none';
  document.getElementById('ft-results').classList.add('hidden');
}

function ft_switchTab(name) {
  // Stub
}

// ────────────────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDRE();
});
