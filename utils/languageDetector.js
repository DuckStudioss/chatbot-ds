function detectLanguage(text) {
    // muy básico, puedes mejorarlo con IA luego
    const spanishWords = ['hola', 'servicio', 'precio', 'información'];
    const lower = text.toLowerCase();
    return spanishWords.some(word => lower.includes(word)) ? 'es' : 'en';
  }
  
  module.exports = { detectLanguage };
  