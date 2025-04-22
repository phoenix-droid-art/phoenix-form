export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(200).end();
    }
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    const { nome, email, telefone } = req.body;
  
    if (!nome || !email || !telefone) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
  
    const sheetId = process.env.SHEET_ID;
    const apiKey = process.env.GOOGLE_API_KEY;
    const range = 'Cadastro!A2:C';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          values: [[nome, email, telefone]]
        }),
      });
  
      if (!response.ok) throw new Error('Erro ao enviar para a planilha');
  
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  
