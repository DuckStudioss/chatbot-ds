const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.post('/webhook', (req, res) => {
  const from = req.body.From || '';
  const msg = req.body.Body || '';
  console.log(`📩 Mensaje recibido de ${from}: ${msg}`);

  // Respuesta automática básica
  const twiml = `
    <Response>
      <Message>¡Hola! 😊 Te habla Antonio, un gusto saludarte. Estoy procesando tu mensaje: "${msg}"</Message>
    </Response>
  `;

  res.type('text/xml');
  res.send(twiml);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
