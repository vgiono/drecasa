// Cron Job - Executa diariamente às 8h
// Lê emails, extrai valores e atualiza DRE Casa

const { findBillEmails } = require('../utils/gmail');
const { extractBillValue } = require('../utils/claude');
const { notifyBillUpdate } = require('../utils/telegram');

export default async function handler(req, res) {
  try {
    console.log('🚀 Iniciando extração de faturas...');

    // 1. Buscar emails de contas
    console.log('📧 Buscando emails de contas...');
    const emails = await findBillEmails();
    console.log(`✅ ${emails.length} emails encontrados`);

    if (emails.length === 0) {
      return res.status(200).json({ message: 'Nenhum email de conta encontrado' });
    }

    // 2. Extrair valores com Claude
    console.log('🤖 Extraindo valores com Claude...');
    const updates = [];

    for (const email of emails) {
      const extracted = await extractBillValue(email.subject, email.body);
      
      if (extracted && extracted.confianca > 0.7) {
        updates.push(extracted);
        console.log(`✅ ${extracted.categoria}: R$ ${extracted.valor}`);
      }
    }

    if (updates.length === 0) {
      return res.status(200).json({ message: 'Nenhum valor extraído com segurança' });
    }

    // 3. Atualizar DRE Casa via API
    console.log('📊 Atualizando DRE Casa...');
    const updateResults = await updateDRECasa(updates);

    // 4. Notificar via Telegram
    console.log('📱 Enviando notificação Telegram...');
    await notifyBillUpdate(updates);

    console.log('✨ Extração concluída com sucesso!');

    return res.status(200).json({
      success: true,
      message: `${updates.length} contas atualizadas`,
      updates: updates,
      results: updateResults
    });

  } catch (error) {
    console.error('❌ Erro na extração:', error);
    
    // Notificar erro
    await notifyBillUpdate([
      {
        categoria: '❌ ERRO',
        valor: 0,
        mes: error.message
      }
    ]);

    return res.status(500).json({
      error: 'Erro na extração de faturas',
      message: error.message
    });
  }
}

async function updateDRECasa(updates) {
  try {
    // Este é um placeholder - você vai usar uma API
    // para atualizar o localStorage do DRE Casa via Vercel
    
    const results = [];

    for (const update of updates) {
      // Aqui você faria uma chamada para atualizar o app
      // Por enquanto, simulamos o sucesso
      results.push({
        categoria: update.categoria,
        valor: update.valor,
        mes: update.mes,
        status: 'updated'
      });
    }

    return results;
  } catch (error) {
    console.error('DRE update error:', error);
    return [];
  }
}
