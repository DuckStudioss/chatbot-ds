const { normalizeText } = require('../utils/messageUtils');
let state = {};

const softwareFlow = (lang, from, msg) => {
  const lowerMsg = normalizeText(msg);
  state[from] = state[from] || { step: 0 };

  const t = {
    en: {
      greeting: "Hi there! 😊 Let us know what you need in web or software development, and we’ll help with a custom proposal.",
      priceMention: "Just so you know, our custom software services start at $3,000/project. Are you okay with that budget?",
      askToContinue: "Would you like to continue with more info or book a meeting?",
      serviceDetails: "We create custom websites, web apps, CRMs, ecommerce systems, and automations. Everything is tailored to your needs.",
      meetingPrompt: "Perfect! Here's a link to schedule a meeting so we can understand your needs and propose the best solution:",
      goodbye: "Awesome! We'll move forward from here. 🐥",
    },
    es: {
      greeting: "¡Hola! 😊 Cuéntame más sobre lo que necesitas en desarrollo web o software, y te ayudamos con una propuesta.",
      priceMention: "Nuestros servicios de desarrollo a medida inician desde $3,000 por proyecto. ¿Está bien ese presupuesto para ti?",
      askToContinue: "¿Deseas más información o agendamos una reunión?",
      serviceDetails: "Creamos páginas web, sistemas, CRMs, ecommerce y automatizaciones personalizadas para tu negocio.",
      meetingPrompt: "¡Genial! Aquí tienes el link para agendar una reunión:",
      goodbye: "¡Perfecto! Seguimos adelante desde aquí. 🐥",
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

module.exports = softwareFlow;
