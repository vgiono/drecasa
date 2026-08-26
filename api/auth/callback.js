// OAuth Callback - Recebe autorização do Google
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/auth/callback`
);

export default async function handler(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'No authorization code provided' });
    }

    // Trocar código por token
    const { tokens } = await oauth2Client.getToken(code);
    
    // Guardar refresh token com segurança
    const refreshToken = tokens.refresh_token;
    
    console.log('✅ OAuth autorizado com sucesso!');
    console.log(`Refresh Token: ${refreshToken}`);

    // Aqui você deve guardar o refresh token de forma segura
    // Por enquanto, retornamos um JSON
    // Você pode usar Vercel KV Store ou outro serviço

    return res.status(200).json({
      success: true,
      message: 'Gmail autorizado com sucesso!',
      refreshToken: refreshToken,
      note: 'Guarde este token com segurança'
    });

  } catch (error) {
    console.error('❌ OAuth error:', error);
    return res.status(500).json({
      error: 'Erro na autorização',
      message: error.message
    });
  }
}
