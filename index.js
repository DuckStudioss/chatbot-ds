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

  let respuesta = `¡Hola! 😊 Te habla Antonio, un gusto saludarte. Estoy procesando tu mensaje: "${msg}"`;

  // 🔍 Base para lógica condicional
  if (msg.toLowerCase().includes("mercadeo")) {
    console.log("💼 El usuario está interesado en el servicio de mercadeo.");
    respuesta = `¡Hola! 😊 Te habla Antonio, un gusto saludarte. Vi que estás interesado en el servicio de mercadeo 360. ¿Te gustaría que te envíe la información detallada?`;
  }

  // 📤 Respuesta para Twilio (XML)
  const twiml = `
    <Response>
      <Message>${respuesta}</Message>
    </Response>
  `;

  res.type('text/xml');
  res.send(twiml);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
