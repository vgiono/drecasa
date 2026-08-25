// ═══════════════════════════════════════════════════════════════════════════
// DRE CASA - APP.JS - Dados REAIS (Extraído do arquivo original)
// ═══════════════════════════════════════════════════════════════════════════

// ─── STATE GLOBAL ──────────────────────────────────────────────────────────
let state = {
  months: [
    'Dezembro 2025', 'Janeiro 2026', 'Fevereiro 2026', 'Março 2026',
    'Abril 2026', 'Maio 2026', 'Junho 2026', 'Julho 2026',
    'Agosto 2026', 'Setembro 2026', 'Outubro 2026', 'Novembro 2026',
    'Dezembro 2026'
  ],
  dre: {
    'Dezembro 2025': {
      receitas: [
        { label: 'Saldo Inicial', value: 225017.0 },
        { label: 'Salário 15 Vi', value: 26994.0 },
        { label: 'Salário 30 Vi', value: 20881.0 },
        { label: 'Bonus + férias', value: null },
        { label: 'Bekatech', value: 27200.0 },
        { label: 'Vikatech', value: null },
        { label: 'Novas Receitas/aplicação', value: null }
      ],
      despesas: [
        { label: 'Contador', value: 606.96 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'IPVA', value: 2273.35 },
        { label: 'St Monica - Cond', value: 1135.0 },
        { label: 'Cpfl - St Monica', value: 250.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Financ Caixa', value: 9294.0 },
        { label: 'Plano de Saúde', value: 0.0 },
        { label: 'Faxina', value: 2000.0 },
        { label: 'Babá/escolinha', value: 1000.0 },
        { label: 'Piscina', value: 270.0 }
      ]
    },
    'Janeiro 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 233481.1 },
        { label: 'Salário 15 Vi', value: 26994.0 },
        { label: 'Salário 30 Vi', value: 20881.0 },
        { label: 'Novas Receitas/aplicação', value: 20000.0 },
        { label: 'Bekatech', value: 27200.0 },
        { label: 'Vikatech', value: null }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'IPVA', value: 7200.0 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Financ Caixa', value: 9295.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 270.0 }
      ]
    },
    'Fevereiro 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 252552.48 },
        { label: 'Salário 15 Vi', value: 26994.0 },
        { label: 'Salário 30 Vi', value: 20881.0 },
        { label: 'Bonus + férias', value: 52000.0 },
        { label: 'Bekatech', value: 27200.0 },
        { label: 'Vikatech', value: 422000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Financ Caixa', value: 9296.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Março 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 728407.47 },
        { label: 'Bonus + férias', value: 369000.0 },
        { label: 'Bekatech', value: 150000.0 },
        { label: 'Vikatech', value: 27300.0 }
      ],
      despesas: [
        { label: 'IPTU Sta Monica', value: 7000.0 },
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Financ Caixa', value: 9297.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: null }
      ]
    },
    'Abril 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1224000.0 },
        { label: 'Vikatech', value: 30000.0 },
        { label: 'Novas Receitas/aplicação', value: 50000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Financ Caixa', value: 9298.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Maio 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1241005.02 },
        { label: 'Vikatech', value: 30000.0 },
        { label: 'Novas Receitas/aplicação', value: 8000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Financ Caixa', value: 9299.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Junho 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1211381.6 },
        { label: 'Salário 15 Vi', value: 50000.0 },
        { label: 'Vikatech', value: 25000.0 },
        { label: 'Novas Receitas/aplicação', value: 8000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Provisão Cartão', value: 20000.0 },
        { label: 'Financ Caixa', value: 9300.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Julho 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1228387.76 },
        { label: 'Salário 15 Vi', value: 50000.0 },
        { label: 'Vikatech', value: 25000.0 },
        { label: 'Novas Receitas/aplicação', value: 8000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Provisão Cartão', value: 20000.0 },
        { label: 'Financ Caixa', value: 9301.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Agosto 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1254791.73 },
        { label: 'Salário 15 Vi', value: 50000.0 },
        { label: 'Vikatech', value: 25000.0 },
        { label: 'Novas Receitas/aplicação', value: 8000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Provisão Cartão', value: 20000.0 },
        { label: 'Financ Caixa', value: 9302.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Setembro 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1282999.3 },
        { label: 'Salário 15 Vi', value: 50000.0 },
        { label: 'Vikatech', value: 25000.0 },
        { label: 'Novas Receitas/aplicação', value: 8000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Provisão Cartão', value: 20000.0 },
        { label: 'Financ Caixa', value: 9303.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Outubro 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1313747.77 },
        { label: 'Salário 15 Vi', value: 50000.0 },
        { label: 'Vikatech', value: 25000.0 },
        { label: 'Novas Receitas/aplicação', value: 8000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Provisão Cartão', value: 20000.0 },
        { label: 'Financ Caixa', value: 9304.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Novembro 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1346314.69 },
        { label: 'Salário 15 Vi', value: 50000.0 },
        { label: 'Vikatech', value: 25000.0 },
        { label: 'Novas Receitas/aplicação', value: 8000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Provisão Cartão', value: 20000.0 },
        { label: 'Financ Caixa', value: 9305.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    },
    'Dezembro 2026': {
      receitas: [
        { label: 'Saldo Inicial', value: 1379489.89 },
        { label: 'Salário 15 Vi', value: 50000.0 },
        { label: 'Vikatech', value: 25000.0 },
        { label: 'Novas Receitas/aplicação', value: 8000.0 }
      ],
      despesas: [
        { label: 'Contador', value: 404.64 },
        { label: 'INSS Obra DARF', value: 533.24 },
        { label: 'Carro', value: 6196.29 },
        { label: 'St Monica - Cond', value: 1129.14 },
        { label: 'Cpfl - St Monica', value: 300.0 },
        { label: 'Azza', value: 103.0 },
        { label: 'Provisão Cartão', value: 20000.0 },
        { label: 'Financ Caixa', value: 9306.0 },
        { label: 'Faxina', value: 4000.0 },
        { label: 'Babá/escolinha', value: 2500.0 },
        { label: 'Piscina', value: 300.0 },
        { label: 'Jardim', value: 600.0 }
      ]
    }
  },
  pix: [
    { mes: 'Dezembro 2024', dia: 4, valor: 364.69, descricao: 'Thor' },
    { mes: 'Dezembro 2024', dia: 5, valor: 550.0, descricao: 'terra/venenos' },
    { mes: 'Dezembro 2024', dia: 7, valor: 40716.0, descricao: 'Edmilsso' },
    { mes: 'Dezembro 2024', dia: 10, valor: 460.6, descricao: 'Tainá foto' },
    { mes: 'Dezembro 2024', dia: 12, valor: 3500.0, descricao: 'Carina' },
    { mes: 'Dezembro 2024', dia: 16, valor: 27000.0, descricao: '2a Parcela Dan' },
    { mes: 'Dezembro 2024', dia: 18, valor: 400.0, descricao: 'Pediatra' },
    { mes: 'Dezembro 2024', dia: 19, valor: 233.05, descricao: 'Material Piscina' },
    { mes: 'Dezembro 2024', dia: 23, valor: 318.6, descricao: 'presente mae' },
    { mes: 'Dezembro 2024', dia: 30, valor: 701.52, descricao: 'Lumi restaurante' },
    { mes: 'Janeiro 2026', dia: 6, valor: 14.03, descricao: 'Barão supermercado' },
    { mes: 'Janeiro 2026', dia: 7, valor: 530.0, descricao: 'Ademar' },
    { mes: 'Janeiro 2026', dia: 8, valor: 400.0, descricao: 'Ana Pediatra' },
    { mes: 'Janeiro 2026', dia: 9, valor: 150.0, descricao: 'Carina' },
    { mes: 'Janeiro 2026', dia: 15, valor: 153.0, descricao: 'Armazem Agricola (Venenos/Mangueiras)' },
    { mes: 'Janeiro 2026', dia: 16, valor: 5.64, descricao: 'Barao mercado' },
    { mes: 'Janeiro 2026', dia: 17, valor: 150.0, descricao: 'Leandro (Frete)' },
    { mes: 'Janeiro 2026', dia: 18, valor: 2500.0, descricao: 'Vila das carnes' },
    { mes: 'Janeiro 2026', dia: 19, valor: 5.61, descricao: 'Barao mercado' },
    { mes: 'Janeiro 2026', dia: 20, valor: 150.0, descricao: 'Porta - Marcus' },
    { mes: 'Janeiro 2026', dia: 21, valor: 25.0, descricao: 'L brandão' },
    { mes: 'Janeiro 2026', dia: 22, valor: 278.92, descricao: 'Pai (Bolo)' },
    { mes: 'Fevereiro 2026', dia: 3, valor: 4000.0, descricao: 'Conta Karen' },
    { mes: 'Fevereiro 2026', dia: 5, valor: 268.0, descricao: 'Babá' },
    { mes: 'Fevereiro 2026', dia: 7, valor: 130.0, descricao: 'Ademar - Venenos' },
    { mes: 'Fevereiro 2026', dia: 11, valor: 1500.0, descricao: 'Karen' },
    { mes: 'Fevereiro 2026', dia: 18, valor: 350.0, descricao: 'Odonto Beni' },
    { mes: 'Fevereiro 2026', dia: 19, valor: 165.2, descricao: 'Venenos Ademar' },
    { mes: 'Fevereiro 2026', dia: 25, valor: 315.0, descricao: 'Dentista' },
    { mes: 'Fevereiro 2026', dia: 27, valor: 1879.0, descricao: 'porta' },
    { mes: 'Fevereiro 2026', dia: 28, valor: 400.0, descricao: 'mir' },
    { mes: 'Março 2026', dia: 6, valor: 3000.0, descricao: 'Karen' },
    { mes: 'Março 2026', dia: 7, valor: 190.0, descricao: 'Venenos' },
    { mes: 'Março 2026', dia: 12, valor: 704.6, descricao: 'Dr Piscinas' },
    { mes: 'Março 2026', dia: 27, valor: 800.0, descricao: 'Adelmo - Motores' },
    { mes: 'Abril 2026', dia: 8, valor: 240.0, descricao: 'certificado empresa' },
    { mes: 'Abril 2026', dia: 10, valor: 4000.0, descricao: 'Conta Karen' },
    { mes: 'Abril 2026', dia: 12, valor: 300.0, descricao: 'limpeza carro' },
    { mes: 'Abril 2026', dia: 15, valor: 81.99, descricao: 'bateria' },
    { mes: 'Abril 2026', dia: 29, valor: 420.57, descricao: 'Pix Vikatech' },
    { mes: 'Maio 2026', dia: 2, valor: 56.0, descricao: 'Venenos' },
    { mes: 'Junho 2026', dia: 13, valor: 365.0, descricao: 'açougue' },
    { mes: 'Junho 2026', dia: 23, valor: 218.0, descricao: 'TecFiltros' },
    { mes: 'Agosto 2026', dia: 22, valor: 190.0, descricao: 'Ademar' },
    { mes: 'Agosto 2026', dia: 26, valor: 270.0, descricao: 'Pomar' },
    { mes: 'Setembro 2026', dia: 9, valor: 7000.0, descricao: 'Adelmo' },
    { mes: 'Outubro 2024', dia: 16, valor: 145.0, descricao: 'Ademar, adubos/Veneno' },
    { mes: 'Outubro 2024', dia: 17, valor: 5762.37, descricao: 'Habite-se Itupeva' },
    { mes: 'Outubro 2024', dia: 18, valor: 80.0, descricao: 'Pix Lucinha' },
    { mes: 'Outubro 2024', dia: 19, valor: 1000.0, descricao: 'Pix Pintor Muro' },
    { mes: 'Outubro 2024', dia: 22, valor: 500.0, descricao: 'Dedetização' },
    { mes: 'Outubro 2024', dia: 31, valor: 1000.0, descricao: 'Pintor Muro' },
    { mes: 'Novembro 2024', dia: 7, valor: 392.25, descricao: 'CPFL Outubro' },
    { mes: 'Novembro 2024', dia: 12, valor: 3203.0, descricao: 'Averbação Cartório' },
    { mes: 'Novembro 2024', dia: 14, valor: 168.0, descricao: 'Ademar terra/Adubo' },
    { mes: 'Novembro 2024', dia: 21, valor: 370.74, descricao: 'lunch Y' },
    { mes: 'Novembro 2024', dia: 25, valor: 317.0, descricao: 'Limpeza' },
    { mes: 'Novembro 2024', dia: 26, valor: 400.0, descricao: 'Pediatra' },
    { mes: 'Novembro 2024', dia: 29, valor: 233.05, descricao: 'Material Piscina' }
  ],
  cartoes: {}
};

// ─── FUNÇÕES UTILITÁRIAS ──────────────────────────────────────────────────
function formatBrl(val) {
  if (val === null || val === undefined) return '—';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(val);
}

function saveState() {
  localStorage.setItem('dreState', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('dreState');
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao carregar state:', e);
    }
  }
  return state;
}

// ─── INIT ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderDRE();
  renderPix();
  renderAnalise();
});

// ─── RENDER FUNCTIONS (Placeholder) ────────────────────────────────────────
function renderDRE() {
  console.log('DRE rendered with real data');
}

function renderPix() {
  console.log('PIX rendered with real data');
}

function renderAnalise() {
  console.log('Análise rendered with real data');
}
