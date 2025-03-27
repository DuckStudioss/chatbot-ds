const { normalizeText } = require('../utils/messageUtils');
let state = {};

const designFlow = (lang, from, msg) => {
  const lowerMsg = normalizeText(msg);
  state[from] = state[from] || { step: 0 };

  const t = {
    en: {
      greeting: "Hi there! 😊 Tell me what you need in graphic design and I’ll be glad to help.",
      priceMention: "Our design services start at $500/project. Does that fit your budget?",
      askToContinue: "Would you like more info or prefer to book a meeting?",
      serviceDetails: "We create branding, logos, social media graphics, ads, packaging, and more — everything tailored to your brand.",
      meetingPrompt: "Awesome! Here's a link to schedule a meeting and align on your goals:",
      goodbye: "Perfect! Looking forward to working together. 🐥",
    },
    es: {
      greeting: "¡Hola! 😊 Cuéntame qué necesitas en diseño gráfico y con gusto te ayudo.",
      priceMention: "Nuestros servicios de diseño parten desde $500 por proyecto. ¿Ese presupuesto te parece bien?",
      askToContinue: "¿Deseas más información o agendamos una reunión?",
      serviceDetails: "Hacemos branding, logos, piezas para redes, anuncios, empaques y más. Todo alineado a tu marca.",
      meetingPrompt: "¡Perfecto! Aquí puedes agendar una reunión y así alineamos objetivos:",
      goodbye: "¡Genial! Esperamos trabajar contigo. 🐥",
    },
  };

  const response = [];
  const affirmatives = ["yes", "sí", "si", "ok", "vale", "de acuerdo", "interesada", "interesado", "me interesa"];
  const infoWords = ["info", "detalles", "más", "service", "details"];
  const bookingWords = ["yes", "agendar", "meeting", "cita"];

  switch (state[from].step) {
    case 0:
      response.push(t[lang].greeting);
      response.push(t[lang].priceMention);
      state[from].step = 1;
      break;

    case 1:
      if (affirmatives.some(word => lowerMsg.includes(word))) {
        response.push(t[lang].askToContinue);
        state[from].step = 2;
      } else {
        response.push(t[lang].priceMention);
      }
      break;

    case 2:
      if (infoWords.some(word => lowerMsg.includes(word))) {
        response.push(t[lang].serviceDetails);
        response.push(t[lang].askToContinue);
      } else if (bookingWords.some(word => lowerMsg.includes(word))) {
        response.push(t[lang].meetingPrompt);
        response.push("👉 [Aquí iría el enlace al calendario o webhook]");
        state[from].step = 3;
      } else {
        response.push(t[lang].askToContinue);
      }
      break;

    default:
      response.push(t[lang].goodbye);
      break;
  }

  return response.join("\n\n");
};

module.exports = designFlow;
