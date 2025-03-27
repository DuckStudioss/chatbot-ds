module.exports = function disenoFlow(msg) {
    return "¡Hola! Soy Antonio 👋 Nuestro equipo de diseño ofrece soluciones creativas y personalizadas. ¿Te gustaría agendar una reunión para hacer una cotización?";
  }
  

  function marketingFlow(lang = 'es') {
    return lang === 'en'
      ? 'Sure! 💡 I’ll tell you how our graphic design service works and what it includes.'
      : '¡Hola! Soy Antonio 👋 Nuestro equipo de diseño ofrece soluciones creativas y personalizadas. ¿Te gustaría agendar una reunión para hacer una cotización?';
  }
  