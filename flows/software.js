module.exports = function softwareFlow(msg) {
    if (msg.toLowerCase().includes("precio") || msg.toLowerCase().includes("costo")) {
      return "Nuestro servicio de desarrollo web parte desde $1500. ¿Te gustaría contarnos sobre tu proyecto para cotizar?";
    }
  
    return "¡Hola! 😊 Cuéntame más sobre lo que necesitas en desarrollo web o software, y te ayudamos con una propuesta.";
  }
  