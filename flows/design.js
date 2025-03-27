let state = {};

function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD') // Descompone letras acentuadas
      .replace(/[\u0300-\u036f]/g, ''); // Elimina tildes
  }  

const designFlow = (lang, from, msg) => {
    const lowerMsg = normalizeText(msg);
  state[from] = state[from] || { step: 0 };

  const t = {
    en: {
      greeting: "Hi there! 😊 Let’s talk about your design needs, I’d love to help you.",
      priceMention: "Our design services start at $100. Would that fit your budget?",
      askToContinue: "Would you like more information or to book a meeting?",
      serviceDetails: "We do logos, branding, social media design, printed materials, product packaging, and much more.",
      meetingPrompt: "Awesome! Here's the link to book a meeting so we can better understand your style and needs:",
      goodbye: "Perfect, we’ll stay in touch! 🐥",
    },
    es: {
      greeting: "¡Hola! 😊 Cuéntame sobre tus necesidades de diseño, con gusto te ayudamos.",
      priceMention: "Nuestros servicios de diseño comienzan desde $100. ¿Ese presupuesto se ajusta a lo que buscás?",
      askToContinue: "¿Querés más información o preferís agendar una reunión?",
      serviceDetails: "Diseñamos logos, identidad visual, redes sociales, material impreso, empaques de productos y mucho más.",
      meetingPrompt: "¡Genial! Aquí tienes el link para agendar una reunión y entender tu estilo y necesidades:",
      goodbye: "Perfecto, seguimos en contacto 🐥",
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
