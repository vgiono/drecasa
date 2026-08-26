// Gmail API para ler emails
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/auth/callback`
);

// Armazenar refresh token (você vai obter isso na primeira autenticação)
// Por enquanto, vamos usar um placeholder
let storedRefreshToken = null;

async function getGmailClient() {
  try {
    if (storedRefreshToken) {
      oauth2Client.setCredentials({
        refresh_token: storedRefreshToken
      });
      
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
    }
    
    return google.gmail({ version: 'v1', auth: oauth2Client });
  } catch (error) {
    console.error('Gmail auth error:', error);
    return null;
  }
}

async function searchEmails(query = 'newer_than:1d') {
  try {
    const gmail = await getGmailClient();
    if (!gmail) return [];

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 10
    });

    return response.data.messages || [];
  } catch (error) {
    console.error('Gmail search error:', error);
    return [];
  }
}

async function getEmailContent(messageId) {
  try {
    const gmail = await getGmailClient();
    if (!gmail) return null;

    const message = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full'
    });

    const headers = message.data.payload.headers;
    const subject = headers.find(h => h.name === 'Subject')?.value || '';
    const from = headers.find(h => h.name === 'From')?.value || '';
    
    let body = '';
    if (message.data.payload.parts) {
      for (const part of message.data.payload.parts) {
        if (part.mimeType === 'text/plain' || part.mimeType === 'text/html') {
          body += Buffer.from(part.body.data, 'base64').toString('utf-8');
        }
      }
    } else if (message.data.payload.body?.data) {
      body = Buffer.from(message.data.payload.body.data, 'base64').toString('utf-8');
    }

    return { subject, from, body, messageId };
  } catch (error) {
    console.error('Get email error:', error);
    return null;
  }
}

async function findBillEmails() {
  try {
    const keywords = [
      'água',
      'energia',
      'internet',
      'condomínio',
      'boleto',
      'fatura',
      'sabesp',
      'enel',
      'vivo',
      'claro',
      'itaú'
    ];

    const emails = [];
    
    for (const keyword of keywords) {
      const results = await searchEmails(`subject:${keyword} newer_than:30d`);
      
      for (const msg of results) {
        const content = await getEmailContent(msg.id);
        if (content) {
          emails.push(content);
        }
      }
    }

    return emails;
  } catch (error) {
    console.error('Find bills error:', error);
    return [];
  }
}

module.exports = {
  getGmailClient,
  searchEmails,
  getEmailContent,
  findBillEmails,
  setRefreshToken: (token) => { storedRefreshToken = token; }
};
