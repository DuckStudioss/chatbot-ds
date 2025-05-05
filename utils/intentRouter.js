async function handleMessage(msg, from) {
  const lang = await detectLanguage(msg);
  const lowerMsg = msg.toLowerCase();

  // 🔍 Verificar intenciones especiales antes de rutas normales
  const intent = intentRouter(msg);
  if (intent) {
    // Acá más adelante podemos disparar alertas por Zapier o correo si es necesario
    return intent.message;
  }

  // 🎯 Ruta normal por palabras clave
  for (const route of routes) {
    for (const keyword of route.keywords) {
      if (lowerMsg.includes(keyword.toLowerCase())) {
        return route.flow(lang, from, msg);
      }
    }
  }

  // ❓ Respuesta por defecto
  return lang === "en"
    ? "I'm here to help! Could you tell me more about what you're looking for?"
    : "¡Estoy aquí para ayudarte! ¿Podés contarme un poco más sobre lo que estás buscando?";
}

module.exports = { handleMessage };
