const express = require('express');
require('dotenv').config();

const app = express();

// Middleware para datos codificados (Twilio envía así)
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Ruta para testear desde navegador
app.get('/', (req, res) => {
  res.send('Antonio está online 🐤');
});

// Webhook de WhatsApp
app.post('/webhook', (req, res) => {
  const from = req.body.From || '';
  const msg = req.body.Body || '';
  console.log(`📩 Mensaje recibido de ${from}: ${msg}`);

  // Respuesta automática en XML
  const twiml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Message>
        ¡Hola! 😊 Te habla Antonio, un gusto saludarte. Estoy procesando tu mensaje: "${msg}"
      </Message>
    </Response>
  `;

  res.type('text/xml');
  res.send(twiml);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
