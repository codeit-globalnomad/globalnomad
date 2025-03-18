import axios from 'axios';

export const convertGoogleToken = async (code: string) => {
  const urlParams = new URLSearchParams({
    code: code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    client_secret: process.env.GOOGLE_SECRET_KEY!,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
    grant_type: 'authorization_code',
  });
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', urlParams, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data.id_token;
  } catch {
    return null;
  }
};
