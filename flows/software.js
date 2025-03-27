let state = {};

const softwareFlow = (lang, from, msg) => {
  const lowerMsg = msg.toLowerCase();
  state[from] = state[from] || { step: 0 };

  const t = {
    en: {
      greeting: "Hi there! 😊 Tell me more about your needs in web or software development, and we’ll help you with a custom proposal.",
      priceMention: "Just so you know, our software development services start at $3,000/month. Are you okay with that budget?",
      askToContinue: "Would you like to continue with more info or book a meeting?",
      serviceDetails: "We create websites, landing pages, CRMs, apps and full systems tailored to your business. Our process is agile, scalable and secure.",
      meetingPrompt: "Perfect! Here's a link to schedule a meeting so we can understand your goals and propose the best solution for you:",
      goodbye: "Awesome, we’ll move forward from here! 🐥",
    },
    es: {
      greeting: "¡Hola! 😊 Cuéntame más sobre lo que necesitas en desarrollo web o software, y te ayudamos con una propuesta.",
      priceMention: "Nuestros servicios de desarrollo web o software inician desde $3,000 al mes. ¿Está bien ese presupuesto para ti?",
      askToContinue: "¿Deseas más información o prefieres agendar una reunión?",
      serviceDetails: "Creamos páginas web, landings, CRMs, apps y sistemas a medida. Nuestro proceso es ágil, escalable y seguro.",
      meetingPrompt: "¡Perfecto! Aquí tienes un enlace para agendar una reunión y así entender tus objetivos y darte la mejor propuesta:",
      goodbye: "¡Genial! Seguimos en contacto 🐥",
    },
  };

  const response = [];

  switch (state[from].step) {
    case 0:
      response.push(t[lang].greeting);
      response.push(t[lang].priceMention);
      state[from].step = 1;
      break;

    case 1:
      if (lowerMsg.includes("yes") || lowerMsg.includes("sí") || lowerMsg.includes("ok") || lowerMsg.includes("vale") || lowerMsg.includes("de acuerdo")) {
        response.push(t[lang].askToContinue);
        state[from].step = 2;
      } else if (lowerMsg.includes("no")) {
        response.push(t[lang].askToContinue);
        state[from].step = 2;
      } else {
        response.push(t[lang].priceMention);
      }
      break;

    case 2:
      if (lowerMsg.includes("info") || lowerMsg.includes("detalles") || lowerMsg.includes("más") || lowerMsg.includes("service") || lowerMsg.includes("details")) {
        response.push(t[lang].serviceDetails);
        response.push(t[lang].askToContinue);
      } else if (lowerMsg.includes("yes") || lowerMsg.includes("agendar") || lowerMsg.includes("meeting") || lowerMsg.includes("cita")) {
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
