const { detectLanguage } = require('../utils/languageDetector');
const marketingFlow = require('../flows/marketing');
const designFlow = require('../flows/design');
const softwareFlow = require('../flows/software');

function handleMessage(msg) {
  const lang = detectLanguage(msg); // esto debe ir primero

  if (msg.toLowerCase().includes('mercadeo') || msg.toLowerCase().includes('marketing')) {
    return marketingFlow(lang);
  } else if (msg.toLowerCase().includes('diseño') || msg.toLowerCase().includes('design')) {
    return designFlow(lang);
  } else if (msg.toLowerCase().includes('software') || msg.toLowerCase().includes('development')) {
    return softwareFlow(lang);
  }

  // Respuesta genérica si no detecta palabras clave
  return lang === 'en'
    ? "I'm here to help! Could you tell me more about what you're looking for?"
    : '¡Estoy aquí para ayudarte! ¿Podés contarme un poco más sobre lo que estás buscando?';
}

module.exports = { handleFlow };
