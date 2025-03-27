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
