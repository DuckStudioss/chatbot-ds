let state = {};

const marketingFlow = (lang, from, msg) => {
  const lowerMsg = msg.toLowerCase();
  const cleanMsg = lowerMsg.replace(/[.,!?¿¡]/g, '').trim(); // limpiamos puntuación
  state[from] = state[from] || { step: 0 };

  const t = {
    en: {
      greeting: "Hi there! 😊 Tell me more about your marketing needs and I'll be happy to help.",
      priceMention: "Just so you know, our marketing services start at $3,000/month. Are you okay with that budget?",
      askToContinue: "Would you like to continue with more info or book a meeting?",
      serviceDetails: "Our service includes strategic content creation, paid ads (Meta, Google, TikTok, LinkedIn), sales funnels, CRM automation, reporting, and more.",
      meetingPrompt: "Perfect! Here's a link to schedule a meeting so we can understand your goals and propose the best solution for you:",
      goodbye: "Great, let’s move forward! 🐥",
    },
    es: {
      greeting: "¡Hola! 😊 Cuéntame más sobre tus necesidades de mercadeo y con gusto te ayudo.",
      priceMention: "Para que lo tengas presente, nuestros servicios de mercadeo inician desde $3,000 al mes. ¿Te parece bien ese presupuesto?",
      askToContinue: "¿Te gustaría continuar con más información o agendamos una reunión?",
      serviceDetails: "Nuestro servicio incluye creación estratégica de contenido, pauta en Meta, Google, TikTok y LinkedIn, embudos de venta, automatizaciones con CRM, reportes y mucho más.",
      meetingPrompt: "¡Perfecto! Aquí tienes un enlace para agendar una reunión y así entender tus objetivos y darte la mejor propuesta:",
      goodbye: "¡Genial, seguimos adelante! 🐥",
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
        const affirmatives = ["yes", "sí", "si", "ok", "vale", "de acuerdo", "estoy interesada", "me interesa"];
        const negatives = ["no"];
      
        if (affirmatives.some(word => lowerMsg.includes(word))) {
          response.push(t[lang].askToContinue);
          state[from].step = 2;
        } else if (negatives.some(word => lowerMsg.includes(word))) {
          response.push(t[lang].askToContinue);
          state[from].step = 2;
        } else {
          response.push(t[lang].priceMention);
        }
        break;
      

    case 2:
      if (
        cleanMsg.includes("info") ||
        cleanMsg.includes("detalles") ||
        cleanMsg.includes("más") ||
        cleanMsg.includes("service") ||
        cleanMsg.includes("details")
      ) {
        response.push(t[lang].serviceDetails);
        response.push(t[lang].askToContinue);
      } else if (
        cleanMsg.includes("yes") ||
        cleanMsg.includes("agendar") ||
        cleanMsg.includes("meeting") ||
        cleanMsg.includes("cita")
      ) {
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

module.exports = marketingFlow;
