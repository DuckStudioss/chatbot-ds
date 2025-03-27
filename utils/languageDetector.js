const detectLanguage = async (text) => {
    const franc = await import('franc-min');
    const langCode = franc.default(text);
    if (langCode === 'spa') return 'es';
    if (langCode === 'eng') return 'en';
    return 'es';
  };
  
  module.exports = { detectLanguage };
  