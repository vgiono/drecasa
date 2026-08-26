// Telegram Bot Notificações
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

async function sendTelegramMessage(message) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.error('Telegram config missing');
      return false;
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Telegram error:', error);
    return false;
  }
}

async function notifyBillUpdate(updates) {
  try {
    let message = '✅ <b>Contas Atualizadas!</b>\n\n';
    
    for (const update of updates) {
      message += `📌 <b>${update.categoria}</b>\n`;
      message += `   R$ ${update.valor.toFixed(2)}\n`;
      message += `   ${update.mes}\n\n`;
    }
    
    message += `<i>Atualizado automaticamente em ${new Date().toLocaleString('pt-BR')}</i>`;
    
    await sendTelegramMessage(message);
  } catch (error) {
    console.error('Notify error:', error);
  }
}

module.exports = { sendTelegramMessage, notifyBillUpdate };
