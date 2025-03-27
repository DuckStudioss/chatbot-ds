let state = {};

const designFlow = (lang, from, msg) => {
  const lowerMsg = msg.toLowerCase();
  state[from] = state[from] || { step: 0 };

  const t = {
    en: {
      greeting: "Hi there! 🎨 Tell me more about the design work you need and I’ll be happy to help.",
      priceMention: "Just so you know, our design services start at $300. Does that fit your budget?",
      askToContinue: "Would you like more info or to book a meeting with our team?",
      serviceDetails: "We offer branding, social media content, web design, and more. All tailored to your business!",
      meetingPrompt: "Awesome! Here's a link to schedule a meeting with our design team:",
      goodbye: "Great, let’s create something amazing! 🐥",
    },
    es: {
      greeting: "¡Hola! 🎨 Cuéntame qué tipo de diseño necesitas y con gusto te ayudo.",
      priceMention: "Para que lo tengas en cuenta, nuestros servicios de diseño inician desde $300. ¿Ese presupuesto está bien para ti?",
      askToContinue: "¿Te gustaría recibir más información o agendar una reunión con nuestro equipo?",
      serviceDetails: "Ofrecemos branding, contenido para redes, diseño web y más. Todo adaptado a tu negocio.",
      meetingPrompt: "¡Perfecto! Aquí tienes un enlace para agendar una reunión con nuestro equipo de diseño:",
      goodbye: "¡Genial, vamos a crear algo increíble! 🐥",
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

module.exports = designFlow;
