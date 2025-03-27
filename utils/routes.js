const marketingFlow = require('../flows/marketing');
const designFlow = require('../flows/design');
const softwareFlow = require('../flows/software');

module.exports = [
  {
    service: 'marketing',
    keywords: ['mercadeo', 'marketing'],
    flow: marketingFlow,
  },
  {
    service: 'design',
    keywords: ['diseño', 'design'],
    flow: designFlow,
  },
  {
    service: 'software',
    keywords: ['software', 'development', 'desarrollo'],
    flow: softwareFlow,
  },
];

function getRoute(msg = '') {
  const message = msg.toLowerCase();

  for (const route of module.exports) {
    if (route.keywords.some(keyword => message.includes(keyword))) {
      return route;
    }
  }

  return null; // Si no se detecta ninguna palabra clave
}

module.exports.getRoute = getRoute;

