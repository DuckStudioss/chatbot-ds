const { detectLanguage } = require('../utils/languageDetector');
const { getRoute } = require('../utils/routes');

async function handleMessage(msgBody, msgFrom) {
  const lang = await detectLanguage(msg);
  const route = getRoute(msg);

  if (route && typeof route.flow === 'function') {
    return route.flow(lang, msgFrom, msgBody);
  }

  // Respuesta genérica si no detecta palabras clave
  return lang === 'en'
    ? "I'm here to help! Could you tell me more about what you're looking for?"
    : '¡Estoy aquí para ayudarte! ¿Podés contarme un poco más sobre lo que estás buscando?';
}

module.exports = { handleMessage };
