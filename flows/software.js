let state = {};

const softwareFlow = (lang, from, msg) => {
  const lowerMsg = msg.toLowerCase();
  state[from] = state[from] || { step: 0 };

  const t = {
    en: {
      greeting: "Hi there! 💻 Tell me more about your software or web development needs.",
      priceMention: "Just so you know, our software development services start at $2,000. Does that work for you?",
      askToContinue: "Would you like more info or to book a meeting with a developer?",
      serviceDetails: "We build custom websites, apps, and internal tools using modern frameworks and automations.",
      meetingPrompt: "Great! Here's a link to schedule a meeting with our development team:",
      goodbye: "Awesome, let’s build something powerful! 🐥",
    },
    es: {
      greeting: "¡Hola! 💻 Cuéntame más sobre tus necesidades en desarrollo web o software.",
      priceMention: "Nuestros servicios de desarrollo inician desde $2,000. ¿Ese presupuesto te funciona?",
      askToContinue: "¿Te gustaría más información o agendamos una reunión con un desarrollador?",
      serviceDetails: "Creamos sitios web, aplicaciones y herramientas internas personalizadas, usando tecnologías modernas y automatización.",
      meetingPrompt: "¡Perfecto! Aquí tienes un enlace para agendar una reunión con nuestro equipo de desarrollo:",
      goodbye: "¡Excelente, vamos a construir algo poderoso! 🐥",
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
