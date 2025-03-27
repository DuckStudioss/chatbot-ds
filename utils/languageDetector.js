const franc = require('franc-min');

function detectLanguage(text) {
  const langCode = franc(text);

  if (langCode === 'spa') return 'es';
  if (langCode === 'eng') return 'en';

  // Si no se puede detectar bien, asumimos español por defecto
  return 'es';
}

module.exports = { detectLanguage };
