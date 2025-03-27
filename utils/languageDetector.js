const { franc } = require('franc-min');

const detectLanguage = async (text) => {
  const langCode = franc(text); // ✅ llamada directa
  if (langCode === 'spa') return 'es';
  if (langCode === 'eng') return 'en';
  return 'es';
};

module.exports = { detectLanguage };
