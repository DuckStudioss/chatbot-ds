const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

const flowController = require('./controllers/flowController');

app.post('/webhook', async (req, res) => {
  const from = req.body.From || '';
  const msg = req.body.Body || '';

  console.log(`📩 Message received from ${from}: ${msg}`);

  try {
    const responseText = await flowController.handleMessage(msg, from);

    const twiml = `
      <Response>
        <Message>${responseText}</Message>
      </Response>
    `;

    res.type('text/xml');
    res.send(twiml);
  } catch (error) {
    console.error('❌ Error handling message:', error);

    const fallback = `
      <Response>
        <Message>Lo siento, algo salió mal. Intenta de nuevo más tarde.</Message>
      </Response>
    `;
    res.type('text/xml');
    res.send(fallback);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
