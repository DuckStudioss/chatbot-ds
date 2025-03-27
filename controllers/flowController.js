const { detectLanguage } = require('../utils/languageDetector');
const marketingFlow = require('../flows/marketing');
const designFlow = require('../flows/design');
const softwareFlow = require('../flows/software');
const routes = require('../utils/routes');

function handleMessage(msg) {
  const lang = detectLanguage(msg);
  const lowerMsg = msg.toLowerCase();

  for (const route of routes) {
    for (const keyword of route.keywords) {
      if (lowerMsg.includes(keyword.toLowerCase())) {
        return route.flow(lang);
      }
    }
  }

  // Respuesta genérica si no detecta palabras clave
  return lang === 'en'
    ? "I'm here to help! Could you tell me more about what you're looking for?"
    : '¡Estoy aquí para ayudarte! ¿Podés contarme un poco más sobre lo que estás buscando?';
}

module.exports = { handleMessage };
