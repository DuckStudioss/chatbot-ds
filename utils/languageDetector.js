const franc = require('franc-min');

function detectLanguage(message) {
  const langCode = franc(message);

  if (langCode === 'spa') return 'es';
  if (langCode === 'eng') return 'en';

  // Si no detecta correctamente, usamos espanol por defecto
  return 'es';
}

module.exports = { detectLanguage };
