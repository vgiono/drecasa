/* ════════════════════════════════════════════════════════════
   DRE CASA - APP.JS
   AGOSTO 2026 - DADOS MANUAL
   ════════════════════════════════════════════════════════════ */

// ────────────────────────────────────────────────────────────
// LOGIN & AUTHENTICATION
// ────────────────────────────────────────────────────────────

// Credenciais padrão (hash SHA-256)
const DEFAULT_USER = 'vgiono';
const DEFAULT_PASS_HASH = 'a1211c2944d86bef22e68890c2a359f2b6467df013091b124a513485fc610697'; // Giono07834!0

// Verificar autenticação ao carregar
function checkAuth() {
  const session = localStorage.getItem('drecasa_session');
  if (!session) {
    showLoginScreen();
    return;
  }
  
  const parsed = JSON.parse(session);
  const now = Date.now();
  
  // Verificar se expirou (7 dias = 604800000 ms)
  if (now - parsed.timestamp > 604800000) {
    logout();
    return;
  }
  
  showAppScreen();
}

function showLoginScreen() {
  document.getElementById('login-container').style.display = 'flex';
  document.getElementById('app-container').style.display = 'none';
}

function showAppScreen() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('app-container').style.display = 'flex';
}

// SHA-256 hash function
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Handle login
async function handleLogin(e) {
  e.preventDefault();
  
  const user = document.getElementById('login-user').value;
  const pass = document.getElementById('login-pass').value;
  const remember = document.getElementById('login-remember').checked;
  
  // Validar usuário
  if (user !== DEFAULT_USER) {
    showLoginError('Usuário inválido');
    return;
  }
  
  // Calcular hash da senha
  const passHash = await sha256(pass);
  
  if (passHash !== DEFAULT_PASS_HASH) {
    showLoginError('Senha incorreta');
    return;
  }
  
  // Login bem-sucedido
  const session = {
    user: user,
    token: Math.random().toString(36).substr(2),
    timestamp: Date.now(),
    remember: remember
  };
  
  localStorage.setItem('drecasa_session', JSON.stringify(session));
  
  // Limpar form
  document.getElementById('login-form').reset();
  document.getElementById('login-error').style.display = 'none';
  
  // Mostrar app
  showAppScreen();
}

function showLoginError(msg) {
  const error = document.getElementById('login-error');
  error.textContent = msg;
  error.style.display = 'block';
  setTimeout(() => {
    error.style.display = 'none';
  }, 3000);
}

function logout() {
  localStorage.removeItem('drecasa_session');
  showLoginScreen();
  document.getElementById('login-form').reset();
}

// Chamar verificação de auth ao carregar página
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(checkAuth, 100);
});

// ────────────────────────────────────────────────────────────

const SEED = {
  "months": ["Agosto 2026","Setembro 2026","Outubro 2026","Novembro 2026","Dezembro 2026"],
  "receitas": [
    {"label":"Saldo Inicial","values":[1254791.73,1282999.30,1313747.77,1346314.69,1379489.89]},
    {"label":"Salario 15 Vi","values":[50000,50000,50000,50000,50000]},
    {"label":"Salario 30 Vi","values":[null,null,null,null,null]},
    {"label":"Ferias + 1parc 13","values":[null,null,null,null,null]},
    {"label":"Bonus + ferias","values":[null,null,null,null,null]},
    {"label":"Bekatech","values":[null,null,null,null,null]},
    {"label":"Vikatech","values":[25000,25000,25000,25000,25000]},
    {"label":"Reembolsos SDS/SulAmerica","values":[432.00,null,null,null,null]},
    {"label":"Novas Receitas/aplicacao","values":[8000,8000,8000,8000,8000]}
  ],
  "despesas": [
    {"label":"IPTU Sta Monica","values":[null,null,null,null,null],"fixed":false},
    {"label":"Contador","values":[404.64,404.64,404.64,404.64,404.64],"fixed":false},
    {"label":"imposto vikatech","values":[null,null,null,null,null],"fixed":false},
    {"label":"INSS Obra DARF","values":[533.24,533.24,533.24,533.24,533.24],"fixed":false},
    {"label":"moveis/Adelmo","values":[null,null,null,null,null],"fixed":false},
    {"label":"Carro","values":[6196.29,6196.29,6196.29,6196.29,6196.29],"fixed":true},
    {"label":"IPVA","values":[null,null,null,null,null],"fixed":false},
    {"label":"Jardim","values":[600,600,600,600,600],"fixed":false},
    {"label":"St Monica - Cond","values":[1084.10,956.82,1020.46,1020.46,1020.46],"fixed":false},
    {"label":"Cpfl - St Monica","values":[1224.37,1032.18,300,300,300],"fixed":false},
    {"label":"Azza","values":[120.62,120.62,120.62,120.62,120.62],"fixed":false},
    {"label":"Provisao Cartao","values":[null,20000,20000,20000,20000],"fixed":false},
    {"label":"Financ Caixa","values":[9302,9303,9304,9305,9306],"fixed":false},
    {"label":"Plano de Saude","values":[null,null,null,null,null],"fixed":false},
    {"label":"Faxina","values":[4000,4000,4000,4000,4000],"fixed":false},
    {"label":"Baba/escolinha","values":[2312.50,2312.50,2312.50,2312.50,2312.50],"fixed":false},
    {"label":"Piscina","values":[300,300,300,300,300],"fixed":false},
    {"label":"Festa Beni","values":[null,null,null,null,null],"fixed":false}
  ],
  "pix": [],
  "faturas_hist": {},
  "si_overrides": {"Agosto 2026": 1254791.73},
  "cartoesByMonth_seed": {
    "Agosto 2026": 122330.63,
    "Setembro 2026": 6882.22,
    "Outubro 2026": 5062.77,
    "Novembro 2026": 4453.49,
    "Dezembro 2026": 1685.18
  }
};

const MONTHS_ORDER = ['Outubro 2024','Novembro 2024','Dezembro 2024','Janeiro 2025','Fevereiro 2025','Marco 2025','Abril 2025','Maio 2025','Junho 2025','Julho 2025','Agosto 2025','Setembro 2025','Outubro 2025','Novembro 2025','Dezembro 2025','Janeiro 2026','Fevereiro 2026','Marco 2026','Abril 2026','Maio 2026','Junho 2026','Julho 2026','Agosto 2026','Setembro 2026','Outubro 2026','Novembro 2026','Dezembro 2026'];

const ML={'Janeiro':'Jan','Fevereiro':'Fev','Marco':'Mar','Abril':'Abr','Maio':'Mai',
  'Junho':'Jun','Julho':'Jul','Agosto':'Ago','Setembro':'Set','Outubro':'Out','Novembro':'Nov','Dezembro':'Dez'};
function sm(m){const[n,a]=m.split(' ');return(ML[n]||n)+'/'+(a||'').slice(2);}

let state=loadState(), viewStart=0, visibleCols=6, pixMonth=null, charts={};

function loadState(){
  const s=localStorage.getItem('drecasa_v5');
  if(s){try{return JSON.parse(s);}catch(e){}}
  return buildInitial();
}

function buildInitial(){
  // colunas visiveis = os meses do SEED (nao o historico completo do MONTHS_ORDER)
  const months=[...SEED.months];
  const dre={};
  const fullMN=[...SEED.months];

  for(const m of months) dre[m]={receitas:[],despesas:[]};

  for(let ci=0;ci<fullMN.length;ci++){
    const mn=fullMN[ci];
    dre[mn].receitas=SEED.receitas
      .filter(r=>r.label!=='Saldo Inicial')
      .map(r=>({label:r.label,value:r.values[ci]??null}));
    dre[mn].despesas=SEED.despesas
      .filter(d=>d.label!=='Cartoes')
      .map(d=>({label:d.label,value:d.values[ci]??null,fixed:d.fixed||false}));
  }

  // cartoesByMonth: pre-built in SEED (faturas_hist totals + DRE gaps)
  const cartoesByMonth={...SEED.cartoesByMonth_seed};

  // pix
  const pix={};
  for(const p of SEED.pix){
    if(!pix[p.mes])pix[p.mes]=[];
    pix[p.mes].push({dia:p.dia,valor:p.valor,descricao:p.descricao});
  }

  // faturas
  const faturas=SEED.faturas_hist||{};

  // SI overrides (manual values that break the cascade)
  const siOverrides=SEED.si_overrides||{};

  return{months,dre,cartoesByMonth,pix,faturas,siOverrides};
}

function saveState(){
  localStorage.setItem('drecasa_v5',JSON.stringify(state));
  const el=document.getElementById('badge-save');
  el.style.display='inline';clearTimeout(el._t);
  el._t=setTimeout(()=>el.style.display='none',2000);
}

// ── CALCULATIONS ──────────────────────────────────────────
function getSI(mn){
  // If manual override exists, use it
  if(state.siOverrides[mn]!==undefined) return state.siOverrides[mn];
  // Use state.months (not MONTHS_ORDER) so 2027+ months work correctly
  const idx=state.months.indexOf(mn);
  if(idx<=0){
    // First month — use seed SI
    const r=SEED.receitas.find(r=>r.label==='Saldo Inicial');
    return r?r.values[0]:0;
  }
  const prev=state.months[idx-1];
  const {totalRec,totalDesp}=calcMonth(prev);
  return getSI(prev)+totalRec-totalDesp;
}

function calcMonth(mn){
  const d=state.dre[mn]||{receitas:[],despesas:[]};
  const totalRec=(d.receitas||[]).reduce((s,r)=>s+(r.value||0),0);
  const cartoes=state.cartoesByMonth[mn]||0;
  // totalDesp = despesa rows (incl. Provisão delta) + cartoesByMonth (fatura real)
  const despRows=(d.despesas||[]).reduce((s,d2)=>s+(d2.value||0),0);
  const totalDesp=despRows+cartoes;
  return{totalRec,totalDesp,cartoes};
}

function getSaldoFinal(mn){
  const si=getSI(mn);
  const{totalRec,totalDesp}=calcMonth(mn);
  return si+totalRec-totalDesp;
}

// ── NAVIGATION ────────────────────────────────────────────
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelector(`.nav-btn[onclick="showPage('${id}')"]`).classList.add('active');
  if(id==='pix')renderPix();
  if(id==='analise')renderAnalise();
  if(id==='faturas')restoreFaturas();
  if(id==='cartoes-tab')renderCartoesParcelas();
}

function restoreFaturas(){
  // Restore previously analyzed fatura if available
  if(!state.fatura_lancamentos||!state.fatura_lancamentos.length) return;
  if(ft_lancamentos.length) return; // already loaded in memory
  ft_lancamentos = state.fatura_lancamentos.map(l=>({...l}));
  ft_cards = [...(state.fatura_cards||[])];
  ft_refreshAll();
  ft_renderReview();
  ft_updateOutrosState();
  // Show results, hide upload
  const uw=document.getElementById('ft-upload-wrap');
  const bb=document.getElementById('ft-back-btn');
  const res=document.getElementById('ft-results');
  if(uw) uw.style.display='none';
  if(bb) bb.style.display='flex';
  if(res) res.classList.remove('hidden');
}
function shiftView(d){
  viewStart=Math.max(0,Math.min(state.months.length-visibleCols,viewStart+d));
  renderDRE();
}
function setVisibleCols(n){visibleCols=n;viewStart=Math.max(0,state.months.length-n);renderDRE();}
function showAllMonths(){visibleCols=state.months.length;viewStart=0;renderDRE();}

// ── DRE RENDER ────────────────────────────────────────────
function renderDRE(){
  const visible=state.months.slice(viewStart,viewStart+visibleCols);
  document.getElementById('mnav-label').textContent=
    visible.length?sm(visible[0])+' → '+sm(visible[visible.length-1]):'';

  // Summary — closest month to today
  const today=new Date();
  const todayIdx=MONTHS_ORDER.findIndex(m=>{
    const[nome,ano]=m.split(' ');
    const mMap={'Janeiro':0,'Fevereiro':1,'Marco':2,'Abril':3,'Maio':4,'Junho':5,
                'Julho':6,'Agosto':7,'Setembro':8,'Outubro':9,'Novembro':10,'Dezembro':11};
    return parseInt(ano)===today.getFullYear() && mMap[nome]===today.getMonth();
  });
  const curMn=todayIdx>=0
    ? MONTHS_ORDER[todayIdx]
    : state.months[state.months.length-1];
  const{totalRec,totalDesp,cartoes}=calcMonth(curMn);
  const sf=getSaldoFinal(curMn);

  // Year-end projection: last month in state
  const lastMn=state.months[state.months.length-1];
  const sfYear=getSaldoFinal(lastMn);
  const isYearEnd=lastMn!==curMn;

  document.getElementById('dre-summary').innerHTML=`
    <div class="sum-card"><div class="sum-label">Saldo Final</div>
      <div class="sum-value ${sf>=0?'green':'red'}">${fmtBrl(sf)}</div>
      <div class="sum-sub">${sm(curMn)}</div></div>
    <div class="sum-card"><div class="sum-label">Receitas</div>
      <div class="sum-value blue">${fmtBrl(totalRec)}</div>
      <div class="sum-sub">${sm(curMn)}</div></div>
    <div class="sum-card"><div class="sum-label">Despesas</div>
      <div class="sum-value red">${fmtBrl(totalDesp)}</div>
      <div class="sum-sub">${sm(curMn)}</div></div>
    <div class="sum-card"><div class="sum-label">Cartões</div>
      <div class="sum-value">${fmtBrl(cartoes)}</div>
      <div class="sum-sub">${sm(curMn)}</div></div>
    ${isYearEnd?`<div class="sum-card" style="border-color:rgba(167,139,250,0.3)">
      <div class="sum-label" style="color:var(--purple)">Projeção</div>
      <div class="sum-value" style="color:var(--purple)">${fmtBrl(sfYear)}</div>
      <div class="sum-sub">${sm(lastMn)}</div></div>`:''}`;

  let html='<thead><tr><th>Categoria</th>';
  for(const m of visible) html+=`<th>${sm(m)}</th>`;
  html+='</tr></thead><tbody>';

  // ── RECEITAS ──
  html+=`<tr class="row-section"><td colspan="${visible.length+1}">Receitas</td></tr>`;

  // Saldo Inicial
  html+=`<tr>`;
  html+=`<td style="padding:0 10px;color:var(--text2)">Saldo Inicial`;
  html+=`</td>`;
  for(const m of visible){
    const v=getSI(m);
    const isOvr=state.siOverrides[m]!==undefined;
    html+=`<td><span class="cell-val ${isOvr?'override':''}"
      contenteditable="true"
      onblur="saveSI('${m}',this)"
      onfocus="this.classList.add('editing')"
      onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}"
      title="${isOvr?'Valor manual (override)':'Calculado do mês anterior'}"
      >${fmtNum(v)}</span></td>`;
  }
  html+='</tr>';

  const recLabels=unionLabels(visible,'receitas');
  for(const lbl of recLabels){
    html+=`<tr data-section="receitas" data-label="${esc(lbl)}">
      <td style="padding:0 10px">
        <button class="btn-remove" onclick="removeRow('receitas','${esc(lbl)}')">✕</button>
        <span ondblclick="renameRow('receitas','${esc(lbl)}')" title="Duplo clique para renomear" style="cursor:pointer">${esc(lbl)}</span>
      </td>`;
    for(const m of visible){
      const row=(state.dre[m]?.receitas||[]).find(r=>r.label===lbl);
      html+=`<td><span class="cell-val" contenteditable="true"
        onblur="saveCell('receitas','${esc(lbl)}','${m}',this)"
        onfocus="this.classList.add('editing')"
        onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}"
        >${row?.value!=null?fmtNum(row.value):''}</span></td>`;
    }
    html+='</tr>';
  }
  html+=`<tr class="row-add"><td colspan="${visible.length+1}">
    <button class="btn-add-row" onclick="addRow('receitas')">+ receita</button></td></tr>`;

  // Total caixa
  html+=`<tr class="row-total"><td>Total Caixa</td>`;
  for(const m of visible){
    const si=getSI(m);
    const t=(state.dre[m]?.receitas||[]).reduce((s,r)=>s+(r.value||0),0);
    html+=`<td><span class="cell-val" style="color:var(--accent)">${fmtBrl(si+t)}</span></td>`;
  }
  html+='</tr>';

  // ── DESPESAS ──
  html+=`<tr class="row-section"><td colspan="${visible.length+1}">Despesas</td></tr>`;

  const despLabels=unionLabels(visible,'despesas');
  for(const lbl of despLabels){
    const isFixed=visible.some(m=>(state.dre[m]?.despesas||[]).find(d=>d.label===lbl&&d.fixed));
    const isProvisao=lbl==='Provisão Cartão';
    html+=`<tr class="${isProvisao?'row-provisao':''}" data-section="despesas" data-label="${esc(lbl)}">
      <td style="padding:0 10px">
        <button class="btn-remove" onclick="removeRow('despesas','${esc(lbl)}')">✕</button>
        <span ondblclick="renameRow('despesas','${esc(lbl)}')" title="Duplo clique para renomear" style="cursor:pointer">${esc(lbl)}</span>
        ${isFixed?'<span class="tag-fixo">fixo</span>':''}
      </td>`;
    for(const m of visible){
      const row=(state.dre[m]?.despesas||[]).find(d=>d.label===lbl);
      html+=`<td><span class="cell-val" contenteditable="true"
        onblur="saveCell('despesas','${esc(lbl)}','${m}',this)"
        onfocus="this.classList.add('editing')"
        onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}"
        >${row?.value!=null?fmtNum(row.value):''}</span></td>`;
    }
    html+='</tr>';
  }

  // Cartões (editável)
  html+=`<tr class="row-cartoes"><td style="padding:0 10px">Cartões</td>`;
  for(const m of visible){
    const v=state.cartoesByMonth[m]??null;
    html+=`<td><span class="cell-val" contenteditable="true"
      onblur="saveCartoes('${m}',this)"
      onfocus="this.classList.add('editing')"
      onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}"
      >${v!=null?fmtNum(v):''}</span></td>`;
  }
  html+='</tr>';

  html+=`<tr class="row-add"><td colspan="${visible.length+1}">
    <button class="btn-add-row" onclick="addRow('despesas')">+ despesa</button></td></tr>`;

  // Total despesas
  html+=`<tr class="row-total"><td>Total Despesas</td>`;
  for(const m of visible){
    const t=(state.dre[m]?.despesas||[]).reduce((s,d)=>s+(d.value||0),0)+(state.cartoesByMonth[m]||0);
    html+=`<td><span class="cell-val" style="color:var(--red)">${fmtBrl(t)}</span></td>`;
  }
  html+='</tr>';

  // ── SALDO FINAL ──
  html+=`<tr class="row-saldo"><td>Saldo Final</td>`;
  for(const m of visible){
    const sf=getSaldoFinal(m);
    html+=`<td><span class="cell-val ${sf>=0?'positive':'negative'}">${fmtBrl(sf)}</span></td>`;
  }
  html+='</tr></tbody>';

  document.getElementById('dre-table').innerHTML=html;
}

function unionLabels(months,section){
  const seen=new Set(),labels=[];
  for(const m of months)
    for(const r of(state.dre[m]?.[section]||[]))
      if(!seen.has(r.label)){seen.add(r.label);labels.push(r.label);}
  return labels;
}

// ── CELL EDITING ──────────────────────────────────────────
function parseVal(v){
  const s=v.trim().replace(/\./g,'').replace(',','.');
  const n=parseFloat(s);return isNaN(n)?null:n;
}

function saveSI(mn,el){
  el.classList.remove('editing');
  const v=parseVal(el.textContent);
  if(v!==null) state.siOverrides[mn]=v;
  else delete state.siOverrides[mn];
  el.textContent=fmtNum(getSI(mn));
  saveState();renderDRE();
}

function saveCell(section,label,mn,el){
  el.classList.remove('editing');
  const val=parseVal(el.textContent);
  if(!state.dre[mn])state.dre[mn]={receitas:[],despesas:[]};
  const arr=state.dre[mn][section];
  const idx=arr.findIndex(r=>r.label===label);
  if(idx>=0)arr[idx].value=val;
  else arr.push({label,value:val,fixed:false});

  // propagate fixed rows
  const isFixed=(idx>=0&&arr[idx].fixed)||(section==='despesas'&&label==='Carro');
  if(isFixed&&val!==null){
    for(const m of state.months){
      if(!state.dre[m])state.dre[m]={receitas:[],despesas:[]};
      const a=state.dre[m][section];
      const i=a.findIndex(r=>r.label===label);
      if(i>=0)a[i].value=val;else a.push({label,value:val,fixed:true});
    }
  }
  el.textContent=val!=null?fmtNum(val):'';
  saveState();renderDRE();
}

function saveCartoes(mn,el){
  el.classList.remove('editing');
  const v=parseVal(el.textContent);
  state.cartoesByMonth[mn]=v;
  el.textContent=v!=null?fmtNum(v):'';
  saveState();renderDRE();
}

function addRow(section){
  const label=prompt(`Nome da ${section==='receitas'?'receita':'despesa'}:`);
  if(!label)return;
  const visible=state.months.slice(viewStart,viewStart+visibleCols);
  for(const m of visible){
    if(!state.dre[m])state.dre[m]={receitas:[],despesas:[]};
    if(!state.dre[m][section].find(r=>r.label===label))
      state.dre[m][section].push({label,value:null,fixed:false});
  }
  saveState();renderDRE();
}

function removeRow(section,label){
  if(!confirm(`Remover "${label}" dos meses visíveis?`))return;
  for(const m of state.months.slice(viewStart,viewStart+visibleCols))
    if(state.dre[m]?.[section])
      state.dre[m][section]=state.dre[m][section].filter(r=>r.label!==label);
  saveState();renderDRE();
}

// Month name helpers
function _parseMN(mn){
  const MN=['Janeiro','Fevereiro','Marco','Abril','Maio','Junho',
            'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const parts=mn.split(' '); return {m:MN.indexOf(parts[0])+1,y:parseInt(parts[1])};
}
function _fmtMN(m,y){
  const MN=['Janeiro','Fevereiro','Marco','Abril','Maio','Junho',
            'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  return MN[m-1]+' '+y;
}
function _nextMN(mn){const {m,y}=_parseMN(mn);return m===12?_fmtMN(1,y+1):_fmtMN(m+1,y);}

function _appendMonth(next){
  if(state.months.includes(next)) return;
  const last=state.months[state.months.length-1];
  state.months.push(next);
  const prev=state.dre[last]||{receitas:[],despesas:[]};
  // Inherit ALL values from previous month — user can clear specific ones
  state.dre[next]={
    receitas:(prev.receitas||[]).map(r=>({...r})),
    despesas:(prev.despesas||[]).map(d=>({...d}))
  };
}

function ensureFutureMonths(){
  const today=new Date();
  const MN=['Janeiro','Fevereiro','Marco','Abril','Maio','Junho',
            'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  for(let i=0;i<=12;i++){
    const d=new Date(today.getFullYear(),today.getMonth()+i,1);
    const mn=MN[d.getMonth()]+' '+d.getFullYear();
    if(!state.months.includes(mn)) _appendMonth(mn);
  }
}

function addMonth(){
  const last=state.months[state.months.length-1];
  const next=_nextMN(last);
  _appendMonth(next);
  viewStart=Math.max(0,state.months.length-visibleCols);
  saveState();renderDRE();
}

// ── PIX ───────────────────────────────────────────────────
function renderPix(){
  const months=Object.keys(state.pix).sort((a,b)=>MONTHS_ORDER.indexOf(b)-MONTHS_ORDER.indexOf(a));
  if(!pixMonth||!months.includes(pixMonth))pixMonth=months[0]||null;

  document.getElementById('pix-sidebar').innerHTML=
    months.map(m=>{
      const t=(state.pix[m]||[]).reduce((s,p)=>s+p.valor,0);
      return`<div class="pix-month-item ${m===pixMonth?'active':''}" onclick="selPixMonth('${m}')">
        <span>${sm(m)}</span><span class="pix-month-total">${fmtBrl(t)}</span></div>`;
    }).join('')+
    `<div class="pix-month-item" onclick="newPixMonth()" style="color:var(--accent)">+ Novo mês</div>`;

  renderPixContent();
}

function selPixMonth(m){pixMonth=m;renderPix();}

function renderPixContent(){
  const mn=pixMonth;
  const el=document.getElementById('pix-content');
  if(!mn){el.innerHTML='<p style="color:var(--text3);padding:20px">Selecione um mês</p>';return;}
  const items=(state.pix[mn]||[]).slice().sort((a,b)=>a.dia-b.dia);
  const total=items.reduce((s,p)=>s+p.valor,0);
  el.innerHTML=`
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
      ${items.map((p,i)=>`
        <div class="pix-item">
          <span class="pix-dia">${p.dia}</span>
          <span class="pix-desc">${esc(p.descricao)}</span>
          <span class="pix-val">R$ ${fmtBrl(p.valor)}</span>
          <button class="pix-del" onclick="removePix('${mn}',${i})">✕</button>
        </div>`).join('')}
    </div>`;
}

function addPix(){
  const dia=parseInt(document.getElementById('p-dia').value);
  const val=parseVal(document.getElementById('p-val').value);
  const desc=document.getElementById('p-desc').value.trim();
  if(!dia||!val||!desc)return;
  if(!state.pix[pixMonth])state.pix[pixMonth]=[];
  state.pix[pixMonth].push({dia,valor:val,descricao:desc});
  saveState();renderPix();
}

function removePix(mn,idx){
  state.pix[mn].splice(idx,1);
  saveState();renderPix();
}

function newPixMonth(){
  const m=prompt('Mês (ex: Junho 2026):');
  if(!m)return;
  if(!state.pix[m])state.pix[m]=[];
  pixMonth=m;saveState();renderPix();
}

// ── ANÁLISE ───────────────────────────────────────────────
const CAT_RULES=[
  {cat:'Mercado Livre',keys:['mercadolivre','mercadopago','meli ','amazonmktplc']},
  {cat:'Carro',keys:['porto seguro','portoseguro','seguro auto']},
  {cat:'Transporte',keys:['connectcar','connect car','conectcar','sem parar','veloe','taggy','autoban','auto ban','pedagio','posto ','shell ','ipiranga','uber','estacion']},
  {cat:'Saúde',keys:['clinica','medic','hospital','odonto','psico','nutri','vacina','invisal','yamasaki','iaro','tonus']},
  {cat:'Farmácia',keys:['drogasil','drogaria','farmacia','panvel']},
  {cat:'Supermercado',keys:['mikami','tauste','bahia 3','hortifruti','sam s club','oba ','supermercado','carrefour']},
  {cat:'Alimentação',keys:['ifood','restaur','burger','cafe','bakery','pizza','lanche','padaria','grill','beer','madero','tostado','bovinu','peco ','veneto','origem','joca','lumi','tendinha','valetes','lancheteria','acougue','bistro']},
  {cat:'Vestuário',keys:['zara','riachuelo','inditex','milon','infanger','galleria','iguatemi','goldko','aquarela','studio w','renner','levis','adidas','nike ','puma ','aramis','dudalina','arezzo','schutz','melissa','cea ']},
  {cat:'Assinaturas',keys:['netflix','disney','spotify','amazonprime','hbo','globoplay','deezer','crunchyroll','adobe','canva','claude']},
  {cat:'Telefone/Internet',keys:['alares','vivoeasyan','tim celular','claro movel']},
  {cat:'Casa',keys:['leroy','casas bahia','magazine','mundo do enx','ri happy','zig*entre']},
  {cat:'Lazer',keys:['hopi hari','zooparque','finath','total eventos','cinema','sympla','sport life','academia','smartfit']},
  {cat:'Pet',keys:['petz','cobasi','veterinari','baloo']},
];
function catOf(d){const t=(d||'').toLowerCase();for(const r of CAT_RULES)if(r.keys.some(k=>t.includes(k)))return r.cat;return 'Outros';}

function renderAnalise(){
  Object.values(charts).forEach(c=>{try{c.destroy();}catch(e){}});charts={};
  const grid=document.getElementById('analise-grid');

  // Monthly cartoes
  const histMns=Object.keys(state.faturas).sort((a,b)=>MONTHS_ORDER.indexOf(a)-MONTHS_ORDER.indexOf(b));
  const byMonth={};
  for(const m of histMns) byMonth[m]=Math.round((state.faturas[m]||[]).reduce((s,i)=>s+i.valor,0));
  for(const[m,v] of Object.entries(state.cartoesByMonth)) if(v) byMonth[m]=v;
  const mLabels=Object.keys(byMonth).sort((a,b)=>MONTHS_ORDER.indexOf(a)-MONTHS_ORDER.indexOf(b));
  const mVals=mLabels.map(m=>byMonth[m]);

  // Category totals
  const catTotals={};
  for(const items of Object.values(state.faturas))
    for(const it of items){
      const c=catOf(it.lancamento);
      catTotals[c]=(catTotals[c]||0)+it.valor;
    }
  const catE=Object.entries(catTotals).sort((a,b)=>b[1]-a[1]);

  // Saldo projetado
  const dreMs=state.months.filter(m=>state.dre[m]&&((state.dre[m].receitas||[]).some(r=>r.value)||(state.dre[m].despesas||[]).some(d=>d.value)));
  const saldoL=dreMs.map(sm);
  const saldoV=dreMs.map(m=>Math.round(getSaldoFinal(m)));

  const COLS=['#3b82f6','#22c55e','#f59e0b','#ef4444','#a78bfa','#06b6d4','#f97316','#84cc16','#ec4899','#14b8a6','#8b5cf6','#eab308','#6366f1','#10b981'];
  const chartOpts={responsive:true,maintainAspectRatio:false,
    plugins:{legend:{labels:{color:'#7c8fa8',font:{size:11}}}},
  };

  grid.innerHTML=`
    <div class="chart-card full"><div class="chart-title">Gastos com cartões por mês</div>
      <div class="chart-wrap tall"><canvas id="ch-mensal"></canvas></div></div>
    <div class="chart-card"><div class="chart-title">Por categoria — histórico</div>
      <div class="chart-wrap"><canvas id="ch-pie"></canvas></div></div>
    <div class="chart-card"><div class="chart-title">Top 10 categorias</div>
      <div class="chart-wrap"><canvas id="ch-bar"></canvas></div></div>
    <div class="chart-card full"><div class="chart-title">Saldo projetado mês a mês</div>
      <div class="chart-wrap"><canvas id="ch-saldo"></canvas></div></div>`;

  const ttBrl={callbacks:{label:ctx=>' R$ '+fmtBrl(ctx.raw)}};

  charts.mensal=new Chart(document.getElementById('ch-mensal'),{type:'bar',
    data:{labels:mLabels.map(sm),datasets:[{data:mVals,backgroundColor:'#3b82f650',borderColor:'#3b82f6',borderWidth:1,borderRadius:4,label:'Cartões'}]},
    options:{...chartOpts,plugins:{...chartOpts.plugins,tooltip:ttBrl},
      scales:{x:{ticks:{color:'#7c8fa8',font:{size:10}}},y:{ticks:{color:'#7c8fa8',callback:v=>'R$'+Math.round(v/1000)+'k'},grid:{color:'#1e2535'}}}}});

  charts.pie=new Chart(document.getElementById('ch-pie'),{type:'doughnut',
    data:{labels:catE.map(e=>e[0]),datasets:[{data:catE.map(e=>Math.round(e[1])),backgroundColor:COLS,borderWidth:0}]},
    options:{...chartOpts,plugins:{legend:{position:'right',labels:{color:'#7c8fa8',font:{size:10},boxWidth:10}},tooltip:ttBrl}}});

  charts.bar=new Chart(document.getElementById('ch-bar'),{type:'bar',
    data:{labels:catE.slice(0,10).map(e=>e[0]),datasets:[{data:catE.slice(0,10).map(e=>Math.round(e[1])),backgroundColor:COLS,borderRadius:4,label:'R$'}]},
    options:{...chartOpts,indexAxis:'y',plugins:{...chartOpts.plugins,tooltip:ttBrl},
      scales:{x:{ticks:{color:'#7c8fa8',callback:v=>'R$'+Math.round(v/1000)+'k'},grid:{color:'#1e2535'}},y:{ticks:{color:'#7c8fa8',font:{size:10}}}}}});

  charts.saldo=new Chart(document.getElementById('ch-saldo'),{type:'line',
    data:{labels:saldoL,datasets:[{data:saldoV,borderColor:'#22c55e',backgroundColor:'rgba(34,197,94,0.07)',fill:true,tension:0.3,pointRadius:3,label:'Saldo Final'}]},
    options:{...chartOpts,plugins:{...chartOpts.plugins,tooltip:ttBrl},
      scales:{x:{ticks:{color:'#7c8fa8',font:{size:10}}},y:{ticks:{color:'#7c8fa8',callback:v=>'R$'+Math.round(v/1000)+'k'},grid:{color:'#1e2535'}}}}});
}

// ── BACKUP ────────────────────────────────────────────────
function exportJSON(){
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));
  a.download='drecasa_'+new Date().toISOString().slice(0,10)+'.json';a.click();
}
function importJSON(){document.getElementById('import-file').click();}
function doImport(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{try{state=JSON.parse(ev.target.result);saveState();renderDRE();alert('Restaurado!');}catch(e){alert('Arquivo inválido.');}};
  r.readAsText(f);
}

// ── UTILS ─────────────────────────────────────────────────
function fmtBrl(v){if(v==null||isNaN(v))return '—';return v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});}
function fmtNum(v){if(v==null)return '';return v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

// INIT
ensureFutureMonths();  // always keep 12 months ahead
// Open on current month
(function(){
  const today=new Date();
  const MN=['Janeiro','Fevereiro','Marco','Abril','Maio','Junho',
            'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const curMn=MN[today.getMonth()]+' '+today.getFullYear();
  const idx=state.months.indexOf(curMn);
  viewStart=idx>=0 ? Math.max(0,idx) : Math.max(0,state.months.length-visibleCols);
})();
renderDRE();


// ================================================================
// FATURAS MODULE
// ================================================================
let ft_files=[], ft_lancamentos=[], ft_cards=[];
let ft_pie=null, ft_bar=null, ft_chatQ=[], ft_chatIdx=0;

document.addEventListener('DOMContentLoaded', function(){
  const dz=document.getElementById('ft-drop-zone');
  const fi=document.getElementById('ft-file-input');
  if(!dz||!fi)return;
  dz.ondragover=e=>{e.preventDefault();dz.classList.add('drag');};
  dz.ondragleave=()=>dz.classList.remove('drag');
  dz.ondrop=e=>{e.preventDefault();dz.classList.remove('drag');ft_addFiles([...e.dataTransfer.files]);};
  fi.onchange=e=>{ft_addFiles([...e.target.files]);fi.value='';};
});


const FT_CATS=['Saúde','Alimentação','Supermercado','Vestuário','Educação','Assinaturas / Streaming','Telefone / Internet','Casa / Moradia','Transporte','Carro','Farmácia','Lazer / Entretenimento','Pet','Presente / Doação','Mercado Livre','Outros'];
const FT_COLORS={'Saúde':'#3dbf8a','Alimentação':'#e09040','Supermercado':'#4f8ef7','Vestuário':'#d45c8a','Educação':'#8b6fd4','Assinaturas / Streaming':'#5e4ab0','Telefone / Internet':'#40c4aa','Casa / Moradia':'#d46040','Transporte':'#7a8099','Carro':'#55595e','Farmácia':'#8abe50','Lazer / Entretenimento':'#c4801a','Pet':'#60a030','Presente / Doação':'#d44040','Mercado Livre':'#c8a020','Outros':'#555a70'};




// ---- File handling ----
function ft_addFiles(fs){fs.forEach(f=>{if(ft_files.length<3)ft_files.push(f);});ft_renderFiles();}
function ft_removeFile(i){ft_files.splice(i,1);ft_renderFiles();}
function ft_renderFiles(){
  document.getElementById('ft-file-list').innerHTML=ft_files.map((f,i)=>`
    <div class="file-item">
      <span class="file-name">📄 ${f.name} <span class="file-size">${(f.size/1024).toFixed(0)} KB</span></span>
      <button class="file-remove" onclick="ft_removeFile(${i})">✕</button>
    </div>`).join('');
  const b=document.getElementById('ft-btn-process');
  b.disabled=!ft_files.length;
  b.textContent=ft_files.length>1?`Analisar ${ft_files.length} faturas`:ft_files.length===1?'Analisar fatura':'Analisar faturas';
}

// ---- Status ----
function ft_showStatus(msg,spin,pct){
  const el=document.getElementById('ft-status');
  el.style.display='flex';
  document.getElementById('ft-status-msg').textContent=msg;
  el.querySelector('.spinner').style.display=spin?'block':'none';
  const pt=document.getElementById('ft-progress-track');
  if(pct!==undefined){pt.style.display='block';document.getElementById('ft-progress-fill').style.width=pct+'%';}
  else pt.style.display='none';
}
function ft_hideStatus(){document.getElementById('ft-status').style.display='none';}

// ---- Process ----

function ft_parseCSV(text, cardName) {
  const lines = text.replace(/\r/g, '').split('\n');
  let parsed = 0;
  for (let i = 1; i < lines.length; i++) { // skip header
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV: data,lançamento,valor
    const cols = line.split(',');
    if (cols.length < 3) continue;

    const dateRaw = cols[0].trim();
    // Join middle cols in case lancamento has comma, last col is valor
    const valorRaw = cols[cols.length - 1].trim();
    const lancamento = cols.slice(1, cols.length - 1).join(',').trim();

    const val = parseFloat(valorRaw);
    if (isNaN(val) || val === 0) continue;
    // Skip only fatura payment entries, keep all other values (incl negatives = credits/adjustments)
    if (/pagamento efetuado/i.test(lancamento)) continue;

    // Convert date from YYYY-MM-DD to DD/MM/YYYY
    let dateStr = dateRaw;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateRaw)) {
      const [y, m, d] = dateRaw.split('-');
      dateStr = `${d}/${m}/${y}`;
    }

    // Parse installments from lancamento: "NOME 03/05" or "NOME03/05"
    const im = lancamento.match(/^(.+?)\s*(\d{2})\/(\d{2})\s*$/);
    const desc = im ? im[1].trim() : lancamento.trim();
    const parAtual = im ? parseInt(im[2]) : null;
    const parTotal = im ? parseInt(im[3]) : null;

    ft_lancamentos.push({
      date: dateStr,
      desc: desc,
      orig: lancamento.trim(),
      val: val,
      pa: parAtual,
      pt: parTotal,
      pr: parAtual && parTotal ? parTotal - parAtual : null,
      card: cardName,
      cat: ft_quickCat(lancamento) || 'Outros',
      ai: false,
      motivo: ''
    });
    parsed++;
  }
  return parsed;
}

async function ft_processAll(){
  ft_lancamentos=[];ft_cards=[];
  document.getElementById('ft-results').classList.add('hidden');
  document.getElementById('ft-btn-ai').style.display='none';
  for(let i=0;i<ft_files.length;i++){
    const file=ft_files[i];
    ft_showStatus(`Lendo ${file.name} (${i+1}/${ft_files.length})`,true);
    if(file.name.toLowerCase().endsWith('.csv')){
      await new Promise(resolve=>{
        const reader=new FileReader();
        reader.onload=e=>{
          try{
            const cardName=ft_getCardName([],i,file.name);
            if(!ft_cards.includes(cardName)) ft_cards.push(cardName);
            ft_parseCSV(e.target.result, cardName);
          }catch(err){console.error(file.name,err);}
          resolve();
        };
        reader.onerror=()=>resolve();
        reader.readAsText(file,'UTF-8');
      });
    } else {
      await ft_readFile(file,i);
    }
  }
  if(!ft_lancamentos.length){ft_showStatus('Nenhum lançamento encontrado.',false);return;}
  ft_hideStatus();
  document.getElementById('ft-btn-ai').style.display='flex';
  ft_renderResults();
}

function ft_readFile(f,idx){
  return new Promise(res=>{
    const r=new FileReader();
    r.onload=e=>{
      try{
        const wb=XLSX.read(e.target.result,{type:'array',cellDates:true});
        const ws=wb.Sheets[wb.SheetNames[0]];
        const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
        const card=ft_getCardName(rows,idx,f.name);
        if(!ft_cards.includes(card))ft_cards.push(card);
        ft_parseRows(rows,card);
      }catch(err){console.error(f.name,err);}
      res();
    };
    r.onerror=()=>res();
    r.readAsArrayBuffer(f);
  });
}

function ft_getCardName(rows,idx,filename){
  // New XLSX format: card name in row 10 (index 9), col B (index 1)
  // e.g. "Itau Personnalite The One Mastercard - final 7710"
  for(const row of rows){
    const c1=String(row[1]||'');
    const m=c1.match(/final\s*(\d{4})/i);
    if(m) return c1.trim(); // full card name
  }
  // CSV fallback: extract from filename
  if(filename){
    const mNum=filename.match(/__(\d+)_/);
    if(mNum) return 'Cartão '+(parseInt(mNum[1])+1);
    if(/fatura.*\.csv$/i.test(filename)) return 'Cartão 1';
  }
  return 'Cartão '+(idx+1);
}

function ft_quickCat(d){
  const t=d.toLowerCase();
  if(/mercadolivre|mercadopago|mercado livre|\bmeli\b/.test(t))return 'Mercado Livre';
  if(/porto seguro|portoseguro|seguro auto|bradesco auto|mapfre|suhai/.test(t))return 'Carro';
  if(/connectcar|connect.?car|conectcar|sem parar|\bveloe\b|\btaggy\b|autoban|auto.?ban|\bpedagio\b|pedágio/.test(t))return 'Transporte';
  if(/netflix|disney\+?|spotify|amazon.?prime|hbo|paramount|globoplay|\bdeezer\b|crunchyroll|ebn\*spotify/.test(t))return 'Assinaturas / Streaming';
  if(/drogasil|drogaria|farmacia|panvel|ultrafarma/.test(t))return 'Farmácia';
  if(/\bifood\b|ifd\*ifood/.test(t))return 'Alimentação';
  return null;
}

function ft_parseRows(rows,card){
  // Detect format: XLSX has empty col A, data in cols B-H
  //   row[1]=date, row[2]=lancamento, row[3]=parcelamento, row[4]=valor
  // CSV (converted to rows): row[0]=date, row[1]=lancamento, row[2]=parcelamento, row[3]=valor
  let sec=false;
  let isXLS=false; // detected from header row

  for(const row of rows){
    const r0=row[0], r1=row[1], r2=row[2], r3=row[3], r4=row[4];

    // Detect XLSX format: col A empty, col B = 'Data', col C = 'Lançamento'
    if(String(r1||'').trim()==='Data' && /^lançamento$/i.test(String(r2||'').trim())){
      isXLS=true; sec=true; continue;
    }
    // CSV format: col A = 'Data', col B = 'Lançamento'
    if(String(r0||'').trim()==='Data' && /^lançamento$/i.test(String(r1||'').trim())){
      isXLS=false; sec=true; continue;
    }
    // Section markers
    if(/lançamentos/i.test(String(r1||''))){continue;}
    if(/total (nacional|internacional|geral)/i.test(String(isXLS?r1:r0)||'')){sec=false;continue;}
    if(!sec) continue;

    let date, lancamento, parcText, val;

    if(isXLS){
      // XLSX: (None, date, lancamento, parcelamento_or_null, valor, ...)
      if(!(r1 instanceof Date) && !String(r1||'').match(/\d/)) continue;
      date = r1 instanceof Date ? r1.toLocaleDateString('pt-BR') : String(r1||'').trim();
      lancamento = String(r2||'').trim();
      parcText = (typeof r3==='string' && /parcela/i.test(r3)) ? r3 : null;
      val = parcText ? r4 : (typeof r3==='number' ? r3 : r4);
    } else {
      // CSV rows: (date, lancamento, parcelamento_or_val, val_if_parc)
      date = r0 instanceof Date ? r0.toLocaleDateString('pt-BR') : String(r0||'').trim();
      lancamento = String(r1||'').trim();
      parcText = (typeof r2==='string' && /parcela/i.test(r2)) ? r2 : null;
      val = parcText ? r3 : (typeof r2==='number' ? r2 : r3);
    }

    if(!lancamento || typeof val !== 'number') continue;
    if(/pagamento efetuado/i.test(lancamento)) continue;

    // Parse pa/pt from "Parcela X de Y" or from "DESC 01/12"
    let pa=null, pt=null, desc=lancamento;
    if(parcText){
      const pm = parcText.match(/(\d+)\s*de\s*(\d+)/i);
      if(pm){pa=parseInt(pm[1]); pt=parseInt(pm[2]);}
      desc = lancamento.trim();
    } else {
      const lm = lancamento.match(/^(.+?)\s*(\d{2})\/(\d{2})\s*$/);
      if(lm){pa=parseInt(lm[2]); pt=parseInt(lm[3]); desc=lm[1].trim();}
    }

    ft_lancamentos.push({
      date, desc, orig:lancamento, val,
      pa, pt, pr:pa&&pt?pt-pa:null,
      card, cat:ft_quickCat(lancamento)||'Outros', ai:false, motivo:''
    });
  }
}

// ---- AI classify all ----
async function ft_classifyAllWithAI(){
  const btn=document.getElementById('ft-btn-ai');
  btn.disabled=true;btn.textContent='✦ Classificando...';
  const uniq=[...new Set(ft_lancamentos.map(l=>l.orig))];
  const BATCH=40,catList=FT_CATS.join(', ');
  const res={};
  for(let i=0;i<uniq.length;i+=BATCH){
    const batch=uniq.slice(i,i+BATCH);
    ft_showStatus(`Classificando com IA... ${Math.min(i+BATCH,uniq.length)}/${uniq.length}`,true,Math.round(i/uniq.length*100));
    const prompt=`Especialista em finanças pessoais brasileiras. Classifique cada lançamento de cartão de crédito na categoria correta.

Categorias disponíveis: ${catList}

Regras importantes:
- "Mercado Livre" para qualquer loja do Mercado Livre/Mercado Pago — mesmo que apareça nome da loja (ex: "Infangerloja*vinh", "Meli*", "Conectloja*", nomes com asterisco que parecem lojas)
- "Carro" para seguros auto (Porto Seguro, Mapfre, etc) e despesas do veículo
- "Transporte" para pedágios, combustível, ConnectCar, Sem Parar, Veloe, Taggy, estacionamentos, Uber, postos de gasolina
- "Outros" APENAS se realmente impossível identificar

Responda APENAS JSON sem markdown:
{"l":[{"d":"desc exata","c":"categoria","m":"motivo curto pt-BR"}]}

Lançamentos:
${batch.map(d=>`- "${d}"`).join('\n')}`;
    try{
      const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1500,messages:[{role:'user',content:prompt}]})});
      const data=await r.json();
      const txt=data.content.map(x=>x.text||'').join('').replace(/```json|```/g,'').trim();
      JSON.parse(txt).l.forEach(item=>{res[item.d]={cat:item.c,mot:item.m};});
    }catch(e){console.error(e);}
  }
  ft_lancamentos.forEach(l=>{if(res[l.orig]){l.cat=res[l.orig].cat;l.motivo=res[l.orig].mot;l.ai=true;}});
  ft_hideStatus();
  btn.disabled=false;btn.textContent='✦ Reclassificar';
  ft_refreshAll();ft_renderReview();
  ft_initChat();
  ft_switchTab('outros');
}

// ---- Fuzzy match (no AI needed) ----
function ft_matchCat(text){
  const t=text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 \/]/g,'');
  for(const cat of FT_CATS){
    const c=cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 \/]/g,'');
    if(t===c||t.includes(c)||c.includes(t))return cat;
  }
  const al={'saude':'Saúde','medico':'Saúde','medica':'Saúde','consulta':'Saúde','hospital':'Saúde',
    'comida':'Alimentação','restaurante':'Alimentação','almoco':'Alimentação','jantar':'Alimentação','lanche':'Alimentação','delivery':'Alimentação','ifood':'Alimentação',
    'mercado':'Supermercado','supermercado':'Supermercado','feira':'Supermercado',
    'roupa':'Vestuário','roupas':'Vestuário','calcado':'Vestuário','sapato':'Vestuário','tenis':'Vestuário','moda':'Vestuário',
    'escola':'Educação','curso':'Educação','faculdade':'Educação',
    'streaming':'Assinaturas / Streaming','assinatura':'Assinaturas / Streaming','netflix':'Assinaturas / Streaming','spotify':'Assinaturas / Streaming',
    'telefone':'Telefone / Internet','internet':'Telefone / Internet','celular':'Telefone / Internet',
    'casa':'Casa / Moradia','moradia':'Casa / Moradia','reforma':'Casa / Moradia',
    'gasolina':'Transporte','combustivel':'Transporte','uber':'Transporte','pedagio':'Transporte','estacionamento':'Transporte','connectcar':'Transporte','sem parar':'Transporte','taggy':'Transporte','veloe':'Transporte',
    'seguro':'Carro','seguro carro':'Carro','seguro auto':'Carro','porto seguro':'Carro','carro':'Carro','auto':'Carro','veiculo':'Carro',
    'farmacia':'Farmácia','remedio':'Farmácia','remedios':'Farmácia','drogaria':'Farmácia',
    'lazer':'Lazer / Entretenimento','academia':'Lazer / Entretenimento','cinema':'Lazer / Entretenimento','viagem':'Lazer / Entretenimento',
    'pet':'Pet','veterinario':'Pet','cachorro':'Pet','gato':'Pet','racao':'Pet',
    'presente':'Presente / Doação','doacao':'Presente / Doação',
    'ml':'Mercado Livre','mercado livre':'Mercado Livre','meli':'Mercado Livre'};
  for(const [k,v] of Object.entries(al)){if(t.includes(k))return v;}
  return null;
}

// ---- Chat ----
function ft_initChat(){
  ft_chatIdx=0;
  ft_chatQ=[...new Map(ft_lancamentos.filter(l=>l.cat==='Outros').map(l=>[l.orig,l])).values()];
  document.getElementById('ft-chat-msgs').innerHTML='';
  ft_renderPills();
  ft_updateOutrosState();
  if(ft_chatQ.length)ft_askNext();
}

function ft_renderPills(){
  document.getElementById('ft-cat-pills').innerHTML=FT_CATS.filter(c=>c!=='Outros').map(c=>{
    const col=FT_COLORS[c]||'#555a70';
    return `<span class="pill" style="background:${col}20;color:${col};border-color:${col}40" onclick="ft_pillClick('${c.replace(/'/g,"\\'")}'">${c}</span>`;
  }).join('');
}

function ft_pillClick(cat){ft_applyChat(cat,`✓ ${cat}`);}

function ft_updateOutrosState(){
  const n=ft_lancamentos.filter(l=>l.cat==='Outros').length;
  document.getElementById('ft-badge-outros').textContent=n;
  const done=document.getElementById('ft-outros-done'),chat=document.getElementById('ft-outros-chat');
  if(n===0){done.classList.remove('hidden');chat.classList.add('hidden');}
  else{done.classList.add('hidden');chat.classList.remove('hidden');}
  const rem=ft_chatQ.length-ft_chatIdx;
  document.getElementById('ft-chat-progress').textContent=ft_chatQ.length?`${ft_chatIdx} de ${ft_chatQ.length} classificados${rem>0?' — faltam '+rem:''}`:' ';
}

function ft_addBotMsg(html){const el=document.getElementById('ft-chat-msgs');el.innerHTML+=`<div class="msg bot"><div class="msg-lbl">Assistente</div><div class="msg-bubble">${html}</div></div>`;el.scrollTop=9999;}
function ft_addUserMsg(t){const el=document.getElementById('ft-chat-msgs');el.innerHTML+=`<div class="msg user"><div class="msg-lbl">Você</div><div class="msg-bubble">${t}</div></div>`;el.scrollTop=9999;}

function ft_askNext(){
  if(ft_chatIdx>=ft_chatQ.length)return;
  const it=ft_chatQ[ft_chatIdx],rem=ft_chatQ.length-ft_chatIdx;
  ft_addBotMsg(`<strong>${it.desc}</strong><br><span style="font-size:11px;color:var(--text3)">${it.card} · R$ ${it.val.toLocaleString('pt-BR',{minimumFractionDigits:2})} · ${rem} restante${rem!==1?'s':''}</span><br><span style="font-size:12px;color:var(--text2)">O que é este gasto?</span>`);
}

async function ft_sendChat(){
  const inp=document.getElementById('ft-chat-input');
  const text=inp.value.trim();
  if(!text||ft_chatIdx>=ft_chatQ.length)return;
  inp.value='';
  ft_addUserMsg(text);

  // 1. match direto/fuzzy
  const m=ft_matchCat(text);
  if(m){ft_applyChat(m,`✓ ${m}`);return;}

  // 2. só chama IA se fuzzy falhou
  document.getElementById('ft-chat-send').disabled=true;
  const cur=ft_chatQ[ft_chatIdx];
  const prompt=`Lançamento: "${cur.orig}". Usuário disse: "${text}". Categorias: ${FT_CATS.filter(c=>c!=='Outros').join(', ')}. Responda APENAS JSON: {"c":"categoria exata","m":"confirmação curta pt-BR"}`;
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:80,messages:[{role:'user',content:prompt}]})});
    const data=await r.json();
    const p=JSON.parse(data.content.map(x=>x.text||'').join('').replace(/```json|```/g,'').trim());
    ft_applyChat(p.c,p.m);
  }catch(e){ft_addBotMsg('Não entendi. Tente clicar numa pílula ou escrever o nome da categoria.');}
  document.getElementById('ft-chat-send').disabled=false;
}

function ft_applyChat(cat,msg){
  if(ft_chatIdx>=ft_chatQ.length)return;
  const cur=ft_chatQ[ft_chatIdx];
  ft_lancamentos.filter(l=>l.orig===cur.orig).forEach(l=>{l.cat=cat;l.ai=true;l.motivo='definido pelo usuário';});
  ft_addBotMsg(msg);
  ft_chatIdx++;
  ft_refreshAll();ft_renderReview();ft_updateOutrosState();
  setTimeout(()=>{
    if(ft_chatIdx<ft_chatQ.length)ft_askNext();
    else ft_addBotMsg('Tudo classificado! 🎉');
  },250);
}

// ---- Render ----
function ft_renderResults(){
  // Persist fatura data in state
  state.fatura_lancamentos = ft_lancamentos.map(l=>({...l}));
  state.fatura_cards = [...ft_cards];
  saveState();
  // Collapse upload section to give space to results
  const uploadWrap = document.getElementById('ft-upload-wrap');
  if(uploadWrap) uploadWrap.style.display='none';
  const backBtn = document.getElementById('ft-back-btn');
  if(backBtn) backBtn.style.display='flex';
  document.getElementById('ft-results').classList.remove('hidden');
  ft_refreshAll();ft_renderReview();ft_initChat();
}

function ft_refreshAll(){
  const total=ft_lancamentos.reduce((s,l)=>s+l.val,0);
  const outros=ft_lancamentos.filter(l=>l.cat==='Outros').length;
  let m=`<div class="metric"><div class="metric-label">Total</div><div class="metric-value red">R$ ${ft_fmtBrl(total)}</div></div>
    <div class="metric"><div class="metric-label">Lançamentos</div><div class="metric-value">${ft_lancamentos.length}</div></div>
    <div class="metric"><div class="metric-label">Parcelados</div><div class="metric-value">${ft_lancamentos.filter(l=>l.pa).length}</div></div>
    <div class="metric"><div class="metric-label">Não ident.</div><div class="metric-value${outros?' red':''}">${outros}</div></div>`;
  ft_cards.forEach(c=>{const t=ft_lancamentos.filter(l=>l.card===c).reduce((s,l)=>s+l.val,0);m+=`<div class="metric"><div class="metric-label">${c}</div><div class="metric-value" style="font-size:15px">R$ ${ft_fmtBrl(t)}</div></div>`;});
  document.getElementById('ft-metrics').innerHTML=m;
  document.getElementById('ft-badge-outros').textContent=outros;
  ft_renderCharts();ft_renderVisao();ft_renderCartoes();ft_renderTable();ft_populateFilters();
}

function ft_catTotals(items){const t={};items.forEach(l=>t[l.cat]=(t[l.cat]||0)+l.val);return Object.entries(t).sort((a,b)=>b[1]-a[1]);}

function ft_renderCharts(){
  try{
    if(typeof Chart==='undefined') throw new Error('Chart.js not loaded');
    const pieEl=document.getElementById('ft-pieChart');
    const barEl=document.getElementById('ft-barChart');
    if(!pieEl||!barEl) throw new Error('canvas not found');

  if(typeof Chart==='undefined'){
    document.getElementById('ft-legend').innerHTML='<span style="color:var(--text3);font-size:12px">Carregando Chart.js...</span>';
    return;
  }
  const sorted=ft_catTotals(ft_lancamentos);
  const labels=sorted.map(e=>e[0]),vals=sorted.map(e=>parseFloat(e[1].toFixed(2)));
  const cols=labels.map(l=>FT_COLORS[l]||'#555a70'),total=vals.reduce((a,b)=>a+b,0);
  document.getElementById('ft-legend').innerHTML=labels.map((l,i)=>`<span class="legend-item"><span class="legend-dot" style="background:${cols[i]}"></span>${l} — R$ ${Math.round(vals[i]).toLocaleString('pt-BR')} (${((vals[i]/total)*100).toFixed(0)}%)</span>`).join('');
  if(ft_pie)ft_pie.destroy();if(ft_bar)ft_bar.destroy();
  ft_pie=new Chart(document.getElementById('ft-pieChart'),{type:'doughnut',data:{labels,datasets:[{data:vals,backgroundColor:cols,borderWidth:1.5,borderColor:'#0f1117'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` R$ ${ft_fmtBrl(ctx.raw)}`}}}}});
  const bh=Math.max(200,labels.length*34+50);
  document.getElementById('ft_bar-wrap').style.height=bh+'px';
  ft_bar=new Chart(document.getElementById('ft-barChart'),{type:'ft_bar',data:{labels,datasets:[{data:vals,backgroundColor:cols,borderRadius:4}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` R$ ${ft_fmtBrl(ctx.raw)}`}}},scales:{x:{ticks:{color:'#555a70',callback:v=>'R$'+Math.round(Number(v)/1000)+'k'},grid:{color:'#1e2130'}},y:{ticks:{color:'#8b90a7',font:{size:11}},grid:{display:false}}}}});

  } catch(e) {
    // Charts unavailable (CDN blocked or canvas missing) — skip silently
    const leg=document.getElementById('ft-legend');
    if(leg) leg.innerHTML='<span style="color:var(--text3);font-size:12px">⚠ Gráficos indisponíveis (Chart.js bloqueado pelo browser)</span>';
  }
}

function ft_catGrid(items){
  const sorted=ft_catTotals(items),total=items.reduce((s,l)=>s+l.val,0);
  return `<div class="cat-grid">${sorted.map(([cat,val])=>`<div class="cat-card"><span class="cat-dot" style="background:${FT_COLORS[cat]||'#555'}"></span><div><div class="cat-name">${cat}</div><div class="cat-val">R$ ${Math.round(val).toLocaleString('pt-BR')} <span class="cat-pct">${((val/total)*100).toFixed(0)}%</span></div></div></div>`).join('')}</div>`;
}

function ft_renderVisao(){
  const total=ft_lancamentos.reduce((s,l)=>s+l.val,0);
  document.getElementById('ft-visao-content').innerHTML=`<div class="section-head">Todos os cartões — R$ ${ft_fmtBrl(total)} · ${ft_lancamentos.length} lançamentos</div>${ft_catGrid(ft_lancamentos)}`;
}

function ft_renderCartoes(){
  document.getElementById('ft-cartoes-content').innerHTML=ft_cards.map(c=>{
    const items=ft_lancamentos.filter(l=>l.card===c),total=items.reduce((s,l)=>s+l.val,0);
    return `<div style="margin-bottom:1.25rem"><div class="section-head">${c} — R$ ${ft_fmtBrl(total)} · ${items.length} lançamentos</div>${ft_catGrid(items)}</div>`;
  }).join('');
}

function ft_renderReview(){
  const items=ft_lancamentos.filter(l=>l.ai);
  document.getElementById('ft-badge-revisar').textContent=items.length;
  if(!items.length){document.getElementById('ft-review-list').innerHTML='<p style="font-size:12px;color:var(--text3)">Nenhuma classificação por IA ainda.</p>';return;}
  const uniq=[...new Map(items.map(l=>[l.orig,l])).values()].sort((a,b)=>a.cat.localeCompare(b.cat));
  const opts=FT_CATS.map(c=>`<option value="${c}">${c}</option>`).join('');
  document.getElementById('ft-review-list').innerHTML=uniq.map(l=>{
    const col=FT_COLORS[l.cat]||'#555',dark=ft_shadeHex(col);
    const sel=FT_CATS.map(c=>`<option value="${c}"${c===l.cat?' selected':''}>${c}</option>`).join('');
    return `<div class="review-item"><div style="flex:1;min-width:0"><div class="review-desc">${l.desc}</div><div class="review-motivo">✦ ${l.motivo||''}</div></div><div style="display:flex;align-items:center;gap:7px;flex-shrink:0"><span class="badge-cat" style="background:${col}20;color:${dark}">${l.cat}</span><select class="cat-sel" data-orig="${l.orig}" onchange="ft_overrideOne(this)"><option value="">—</option>${sel}</select></div></div>`;
  }).join('');
}

function ft_overrideOne(sel){
  const orig=sel.getAttribute('data-orig'),cat=sel.value;if(!cat)return;
  ft_lancamentos.filter(l=>l.orig===orig).forEach(l=>{l.cat=cat;});
  ft_refreshAll();ft_renderReview();
}

function ft_renderTable(cf,kf){
  let data=[...ft_lancamentos].sort((a,b)=>b.val-a.val);
  if(cf)data=data.filter(l=>l.cat===cf);
  if(kf)data=data.filter(l=>l.card===kf);
  const total=data.reduce((s,l)=>s+l.val,0),filt=cf||kf;
  document.getElementById('table-body').innerHTML=data.map(l=>{
    const col=FT_COLORS[l.cat]||'#555',dark=ft_shadeHex(col);
    const par=l.pa?` <span style="font-size:11px;color:var(--text3)">${l.pa}/${l.pt}</span>`:'';
    const dot=l.ai?'<span class="ai-dot" title="Classificado por IA"></span>':'';
    return `<tr><td style="white-space:nowrap;color:var(--text3);font-size:12px">${l.date}</td><td>${l.desc}${par}</td><td><span class="badge-card">${l.card}</span></td><td><span class="badge-cat" style="background:${col}20;color:${dark}">${l.cat}</span>${dot}</td><td style="text-align:right;font-weight:500">R$ ${ft_fmtBrl(l.val)}</td></tr>`;
  }).join('');
  document.getElementById('table-foot').innerHTML=`<tr class="tfoot-row"><td colspan="4" style="font-size:11px;color:var(--text3)">${data.length} lançamento${data.length!==1?'s':''}</td><td style="text-align:right">R$ ${ft_fmtBrl(total)}</td></tr>`;
  document.getElementById('ft-filter-info').innerHTML=filt?`<strong>${data.length}</strong> lançamento${data.length!==1?'s':''} · <strong>R$ ${ft_fmtBrl(total)}</strong>`:'';
}

function ft_populateFilters(){
  const cf=document.getElementById('ft-cat-filter').value,kf=document.getElementById('ft-card-filter').value;
  const cats=[...new Set(ft_lancamentos.map(l=>l.cat))].sort();
  document.getElementById('ft-cat-filter').innerHTML='<option value="">Todas as categorias</option>'+cats.map(c=>`<option${c===cf?' selected':''}>${c}</option>`).join('');
  document.getElementById('ft-card-filter').innerHTML='<option value="">Todos os cartões</option>'+ft_cards.map(c=>`<option${c===kf?' selected':''}>${c}</option>`).join('');
  const apply=()=>ft_renderTable(document.getElementById('ft-cat-filter').value,document.getElementById('ft-card-filter').value);
  document.getElementById('ft-cat-filter').onchange=apply;
  document.getElementById('ft-card-filter').onchange=apply;
}

function ft_switchTab(name){
  const tabs=['cat','visao','cartoes','revisar','outros','lanc','export'];
  const pg=document.getElementById('page-faturas');
  pg.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',tabs[i]===name));
  pg.querySelectorAll('.tab-content').forEach((t,i)=>t.classList.toggle('active',tabs[i]===name));
}

function ft_fmtBrl(v){return v.toLocaleString('pt-BR',{minimumFractionDigits:2});}
function ft_shadeHex(hex){try{const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return `rgb(${Math.round(r*.7)},${Math.round(g*.7)},${Math.round(b*.7)})`;}catch{return hex;}}

function ft_exportCSV(){
  const h='data,lancamento,valor,parcela_atual,parcela_total,parcelas_restantes,cartao,categoria\n';
  const rows=ft_lancamentos.map(l=>{const desc=l.pa?`${l.desc} ${String(l.pa).padStart(2,'0')}/${String(l.pt).padStart(2,'0')}`:l.desc;return[l.date,`"${desc}"`,l.val.toFixed(2),l.pa||'',l.pt||'',l.pr||'',l.card,l.cat].join(',');}).join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([h+rows],{type:'text/csv'}));a.download='faturas_consolidadas.csv';a.click();
}

function ft_sendAnalysis(){
  const total=ft_lancamentos.reduce((s,l)=>s+l.val,0);
  const ct=ft_catTotals(ft_lancamentos),cts={};
  ft_cards.forEach(c=>cts[c]=ft_lancamentos.filter(l=>l.card===c).reduce((s,l)=>s+l.val,0));
  const msg=`Analise minhas faturas (${ft_cards.length} cartões):\n\nTotal: R$ ${ft_fmtBrl(total)}\n\nPor cartão:\n${ft_cards.map(c=>`- ${c}: R$ ${ft_fmtBrl(cts[c])}`).join('\n')}\n\nPor categoria:\n${ct.map(([c,v])=>`- ${c}: R$ ${ft_fmtBrl(v)} (${((v/total)*100).toFixed(0)}%)`).join('\n')}\n\nTop 10 gastos:\n${[...ft_lancamentos].sort((a,b)=>b.val-a.val).slice(0,10).map(l=>`- ${l.desc} (${l.card}): R$ ${ft_fmtBrl(l.val)}`).join('\n')}\n\nComente o que chama atenção e dê sugestões para reduzir.`;
  if(window.sendPrompt)window.sendPrompt(msg);
  else{const ta=document.createElement('textarea');ta.value=msg;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();alert('Resumo copiado! Cole no chat do Claude.');}
}



function ft_resetUpload(){
  ft_files=[]; ft_lancamentos=[]; ft_cards=[];
  ft_renderFiles();
  document.getElementById('ft-upload-wrap').style.display='block';
  document.getElementById('ft-back-btn').style.display='none';
  document.getElementById('ft-results').classList.add('hidden');
  document.getElementById('ft-btn-ai').style.display='none';
}

function ft_sendToDRE(){
  if(!ft_lancamentos.length){alert('Processe as faturas primeiro.');return;}

  // Determine current fatura month
  const mc={};
  for(const l of ft_lancamentos){
    if(l.val<=0) continue;
    const p=(l.date||'').split('/');
    if(p.length===3){const k=p[1]+'/'+p[2];mc[k]=(mc[k]||0)+1;}
  }
  if(!Object.keys(mc).length){alert('Não foi possível determinar o mês.');return;}
  const top=Object.keys(mc).sort((a,b)=>{
    const[ma,ya]=a.split('/').map(Number);
    const[mb,yb]=b.split('/').map(Number);
    return yb!==ya?yb-ya:mb-ma;
  })[0];
  const[mm,yy]=top.split('/');
  const MN=['','Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const mn=MN[parseInt(mm)]+' '+yy;

  // Net fatura total
  const total=Math.round(ft_lancamentos.reduce((s,l)=>s+l.val,0)*100)/100;
  if(!confirm('Enviar R$ '+total.toLocaleString('pt-BR',{minimumFractionDigits:2})+' como Cartões de '+mn+' para o DRE e atualizar projeção futura?'))return;

  // Opção 5: estimativa adicional até o fechamento
  const deltaStr = prompt(
    'Estimativa adicional até o fechamento da fatura?\n' +
    '(gastos que ainda vão entrar antes do dia de fechamento)\n\n' +
    'Digite 0 ou deixe em branco para não adicionar.',
    '0'
  );
  const delta = parseFloat((deltaStr||'0').replace(',','.')) || 0;
  // Provisão = only the delta (remaining spend estimate until closing)
  if(!state.dre[mn]) state.dre[mn]={receitas:[],despesas:[]};
  const provRow = state.dre[mn].despesas.find(d=>d.label==='Provisão Cartão');
  if(provRow && delta > 0){
    provRow.value = delta;
  }

  // ── Update current month ──
  state.cartoesByMonth[mn]=total;
  state.faturas[mn]=ft_lancamentos.filter(l=>l.val!==0).map(l=>({data:l.date,lancamento:l.orig||l.desc,valor:l.val}));

  // ── Update ALL future months with projected installment totals ──
  // Dedup parcelados (same logic as renderCartoesParcelas)
  const parcelados = ft_lancamentos.filter(l=>l.pa&&l.pt&&l.val>0);
  const map={};
  parcelados.forEach(l=>{
    const key=(l.date||'')+'|'+(l.desc||'').toLowerCase()+'|'+Math.round(l.val)+'|'+l.pt;
    if(!map[key]||l.pa<map[key].pa) map[key]=l;
  });
  const unique=Object.values(map);
  const maxPr=unique.length?Math.max(...unique.map(l=>l.pt-l.pa)):0;

  // Base month from fatura
  const baseM=parseInt(mm), baseY=parseInt(yy);
  for(let i=1;i<=maxPr;i++){
    const totalM=(baseM-1+i);
    const futM=totalM%12+1;
    const futY=baseY+Math.floor(totalM/12);
    const futMn=MN[futM]+' '+futY;
    const proj=unique.filter(l=>i<=l.pt-l.pa).reduce((s,l)=>s+l.val,0);
    state.cartoesByMonth[futMn]=Math.round(proj*100)/100;
  }

  saveState();

  // ── Auto backup ──
  exportJSON();

  showPage('dre');renderDRE();
}


function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('drecasa_theme', t);
  // Update active dot border
  document.querySelectorAll('[onclick^="setTheme"]').forEach(b => {
    b.style.outline = 'none';
  });
  const btn = document.querySelector(`[onclick="setTheme('${t}')"]`);
  if(btn) btn.style.outline = '2px solid var(--accent)';
}
// Init theme on load
(function(){
  const saved = localStorage.getItem('drecasa_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();









// ── CARTÕES / PARCELAMENTOS TAB ─────────────────────────────────
function renderCartoesParcelas(){
  const lanc = state.fatura_lancamentos || [];
  if(!lanc.length){
    document.getElementById('cartoes-summary').innerHTML =
      '<div style="color:var(--text3);font-size:13px;padding:8px 0">Nenhuma fatura carregada. Vá em <b>Faturas</b>, analise os CSVs e volte aqui.</div>';
    document.getElementById('cartoes-table').innerHTML = '';
    return;
  }

  // Separate parcelados from avista
  const parcelados = lanc.filter(l => l.pa && l.pt && l.val > 0);
  const avista     = lanc.filter(l => (!l.pa || !l.pt) && l.val > 0);

  // Dedup parcelados: keep lowest pa per purchase (date+desc+val+pt)
  const map = {};
  parcelados.forEach(l => {
    const key = (l.date||'') + '|' + (l.desc||'').toLowerCase() + '|' + Math.round(l.val) + '|' + l.pt;
    if(!map[key] || l.pa < map[key].pa) map[key] = l;
  });
  const unique = Object.values(map).sort((a,b) => b.val*(b.pt-b.pa+1) - a.val*(a.pt-a.pa+1));

  // Summary cards
  const totalParc   = unique.reduce((s,l) => s + l.val*(l.pt-l.pa+1), 0);
  const totalMes    = unique.reduce((s,l) => s + l.val, 0);
  const totalAvista = avista.reduce((s,l) => s + l.val, 0);
  const totalFatura = lanc.reduce((s,l) => s + (l.val||0), 0); // net incl credits
  document.getElementById('cartoes-summary').innerHTML = `
    <div class="sum-card"><div class="sum-label">Parcelados</div><div class="sum-value">${unique.length}</div></div>
    <div class="sum-card"><div class="sum-label">Compromisso futuro</div><div class="sum-value red">${fmtBrl(totalParc)}</div><div class="sum-sub">total restante</div></div>
    <div class="sum-card"><div class="sum-label">Parcelas do mês</div><div class="sum-value">${fmtBrl(totalMes)}</div></div>
    <div class="sum-card"><div class="sum-label">À vista</div><div class="sum-value">${fmtBrl(totalAvista)}</div><div class="sum-sub">${avista.length} itens</div></div>
    <div class="sum-card" style="border-color:rgba(34,197,94,0.3)"><div class="sum-label" style="color:var(--green)">Total fatura</div><div class="sum-value" style="color:var(--green)">${fmtBrl(totalFatura)}</div></div>`;

  // Projection months: from today until last active installment
  const today = new Date();
  const maxPr = unique.length ? Math.max(...unique.map(l => l.pt - l.pa)) : 5;
  const months = [];
  for(let i=0; i<=maxPr; i++){
    const d = new Date(today.getFullYear(), today.getMonth()+i, 1);
    months.push({
      label: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][d.getMonth()]+'/'+String(d.getFullYear()).slice(2),
      idx: i
    });
  }

  // Build unified table: parcelados + avista (avista only in month 0)
  let html = `<thead><tr>
    <th style="min-width:65px;text-align:center">Data</th>
    <th style="min-width:160px">Descrição</th>
    <th style="text-align:center">Parcela</th>
    <th style="text-align:right">Valor</th>
    <th style="text-align:right">Total restante</th>`;
  months.forEach(m => html += `<th style="text-align:right">${m.label}</th>`);
  html += `</tr></thead><tbody>`;

  // ── Parcelados rows ──
  html += `<tr class="row-section"><td colspan="${5+months.length}" style="padding:8px 10px 4px;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;border-bottom:none">Parcelados</td></tr>`;

  unique.forEach(l => {
    const pr = l.pt - l.pa;
    const dateShort = (l.date||'').slice(3); // MM/YYYY
    html += `<tr>
      <td style="text-align:center;font-family:var(--mono);font-size:11px;color:var(--text2)">${dateShort}</td>
      <td style="font-size:13px;padding:5px 10px">${esc(l.desc)}</td>
      <td style="text-align:center;font-family:var(--mono);font-size:12px;color:var(--text2)">${l.pa}/${l.pt}</td>
      <td style="text-align:right;font-family:var(--mono);font-size:12px">${fmtBrl(l.val)}</td>
      <td style="text-align:right;font-family:var(--mono);font-size:12px;color:var(--yellow)">${fmtBrl(l.val*(pr+1))}</td>`;
    months.forEach(m => {
      html += m.idx <= pr
        ? `<td style="text-align:right;font-family:var(--mono);font-size:12px">${fmtBrl(l.val)}</td>`
        : `<td style="text-align:right;color:var(--text3);font-size:11px">—</td>`;
    });
    html += `</tr>`;
  });

  // ── Subtotal parcelados ──
  html += `<tr class="row-total"><td colspan="5" style="font-size:12px;color:var(--text2)">Subtotal parcelados</td>`;
  months.forEach(m => {
    const t = unique.filter(l => m.idx <= l.pt-l.pa).reduce((s,l)=>s+l.val,0);
    html += `<td style="text-align:right;font-family:var(--mono);font-size:12px;color:var(--accent)">${fmtBrl(t)}</td>`;
  });
  html += `</tr>`;

  // ── À vista rows (only column 0 = current month) ──
  if(avista.length){
    html += `<tr class="row-section"><td colspan="${5+months.length}" style="padding:8px 10px 4px;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;border-bottom:none">À vista — mês atual</td></tr>`;

    const avistaSorted = [...avista].sort((a,b)=>b.val-a.val);
    avistaSorted.forEach(l => {
      html += `<tr>
        <td style="text-align:center;font-family:var(--mono);font-size:11px;color:var(--text2)">${(l.date||'').slice(3)}</td>
        <td style="font-size:13px;padding:5px 10px;color:var(--text2)">${esc(l.desc)}</td>
        <td style="text-align:center;color:var(--text3);font-size:11px">—</td>
        <td style="text-align:right;font-family:var(--mono);font-size:12px;color:var(--text2)">${fmtBrl(l.val)}</td>
        <td style="text-align:right;color:var(--text3);font-size:11px">—</td>`;
      months.forEach(m => {
        html += m.idx === 0
          ? `<td style="text-align:right;font-family:var(--mono);font-size:12px;color:var(--text2)">${fmtBrl(l.val)}</td>`
          : `<td style="text-align:right;color:var(--text3);font-size:11px">—</td>`;
      });
      html += `</tr>`;
    });

    // Subtotal avista
    html += `<tr class="row-total"><td colspan="5" style="font-size:12px;color:var(--text2)">Subtotal à vista</td>`;
    months.forEach(m => {
      html += m.idx === 0
        ? `<td style="text-align:right;font-family:var(--mono);font-size:12px;color:var(--accent)">${fmtBrl(totalAvista)}</td>`
        : `<td style="text-align:right;color:var(--text3);font-size:11px">—</td>`;
    });
    html += `</tr>`;
  }

  // ── Grand total row ──
  // For current month: use net fatura total (includes credits/adjustments)
  // For future months: parcelados only
  html += `<tr class="row-saldo"><td colspan="5" style="font-size:13px">Total fatura</td>`;
  months.forEach(m => {
    const parc = unique.filter(l => m.idx <= l.pt-l.pa).reduce((s,l)=>s+l.val,0);
    const val  = m.idx === 0 ? totalFatura : parc;
    html += `<td style="text-align:right;font-family:var(--mono);font-size:13px;color:var(--green)">${fmtBrl(val)}</td>`;
  });
  html += `</tr></tbody>`;

  document.getElementById('cartoes-table').innerHTML = html;

  // Hide the old avista section (no longer used)
  const sec = document.getElementById('cartoes-avista-section');
  if(sec) sec.style.display = 'none';
}

function _renderCartoesFiltered(){ renderCartoesParcelas(); }

function renameRow(section, oldLabel){
  const newLabel = prompt('Novo nome:', oldLabel);
  if(!newLabel || newLabel.trim()===oldLabel) return;
  const nl = newLabel.trim();
  // Rename in all months
  state.months.forEach(mn => {
    const rows = state.dre[mn]?.[section] || [];
    const row = rows.find(r=>r.label===oldLabel);
    if(row) row.label = nl;
  });
  saveState();
  renderDRE();
}
