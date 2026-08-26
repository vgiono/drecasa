// Claude API para extração de dados
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Categorias mapeadas
const CATEGORY_MAP = {
  'água': 'Azza',
  'sabesp': 'Azza',
  'energia': 'Cpfl - St Monica',
  'enel': 'Cpfl - St Monica',
  'eletropaulo': 'Cpfl - St Monica',
  'internet': 'Provisão Cartão',
  'vivo': 'Provisão Cartão',
  'claro': 'Provisão Cartão',
  'intelbras': 'Provisão Cartão',
  'condomínio': 'St Monica - Cond',
  'boleto': 'St Monica - Cond',
  'cartão': 'Provisão Cartão',
  'black': 'Provisão Cartão',
  'mastercard': 'Provisão Cartão',
  'visa': 'Provisão Cartão',
  'itaú': 'Provisão Cartão'
};

async function extractBillValue(emailSubject, emailBody) {
  try {
    const prompt = `Analise este email de fatura e extraia as informações:

ASSUNTO: ${emailSubject}
CORPO: ${emailBody.substring(0, 1000)}

Por favor, responda em JSON com este formato:
{
  "categoria": "água|energia|internet|condomínio|cartão",
  "valor": 123.45,
  "mes": "Agosto 2026",
  "confianca": 0.95
}

Se não conseguir extrair, retorne null.`;

    const message = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Extrair JSON da resposta
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const data = JSON.parse(jsonMatch[0]);
    
    // Mapear categoria
    const categoryKey = data.categoria.toLowerCase();
    data.categoria = CATEGORY_MAP[categoryKey] || data.categoria;
    
    return data;
  } catch (error) {
    console.error('Claude extraction error:', error);
    return null;
  }
}

module.exports = { extractBillValue };
