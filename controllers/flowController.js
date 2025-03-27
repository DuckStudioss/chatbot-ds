const marketing = require('../flows/marketing');
const design = require('../flows/design');
const software = require('../flows/software');
const { detectLanguage } = require('../utils/languageDetector');
const messages = {
  es: require('../locales/es.json'),
  en: require('../locales/en.json'),
};

function handleMessage(msg) {
  const lang = detectLanguage(msg); // "es" o "en"

  if (msg.toLowerCase().includes('mercadeo') || msg.toLowerCase().includes('marketing')) {
    return marketing(msg, messages[lang]);
  }
  if (msg.toLowerCase().includes('diseño') || msg.toLowerCase().includes('design')) {
    return design(msg, messages[lang]);
  }
  if (msg.toLowerCase().includes('software')) {
    return software(msg, messages[lang]);
  }

  return messages[lang].default;
}

module.exports = { handleMessage };
