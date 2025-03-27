module.exports = function marketingFlow(msg) {
    if (msg.toLowerCase().includes("precio")) {
      return "Nuestro servicio de mercadeo inicia en $3000 mensuales. ¿Deseas agendar una reunión para conocer más?";
    }
  
    return "¡Hola! 🙌 Soy Antonio. Cuéntame, ¿qué te interesa saber sobre nuestro servicio de mercadeo?";
  }
  