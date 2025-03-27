
function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // elimina acentos
      .trim(); // elimina espacios innecesarios
  }
  
  function includesAny(text, keywords) {
    const normalizedText = normalizeText(text);
    return keywords.some((keyword) =>
      normalizedText.includes(normalizeText(keyword))
    );
  }
  
  module.exports = {
    normalizeText,
    includesAny,
  };
  