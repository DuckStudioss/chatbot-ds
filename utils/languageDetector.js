const detectLanguage = async (text) => {
    const { franc } = await import('franc-min'); // ✅ dynamic import
    const langCode = franc(text);
  
    if (langCode === 'spa') return 'es';
    if (langCode === 'eng') return 'en';
    return 'es';
  };
  
  module.exports = { detectLanguage };
  