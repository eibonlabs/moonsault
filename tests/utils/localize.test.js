const assert = require('assert');

// Setup minimal global window.moonsault
global.moonsault = {
  localization: { en: { greeting: 'Hello' } },
  language: 'en'
};

const { localize } = require('../../src/lib/localize.js');

// Mock element with data-localize attribute
const elem = {
  querySelectorAll: () => [elem],
  getAttribute: (name) => {
    if (name === 'data-localize') return 'greeting';
  },
  textContent: ''
};

localize(elem);
assert.strictEqual(elem.textContent, 'Hello');
console.log('✓ localize.test.js');
