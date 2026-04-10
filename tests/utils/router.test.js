const assert = require('assert');

// Setup globals
global.window = { location: { href:'http://localhost/#/home', hash:'#/home' } };
global.moonsault = { urlParams:{params:{}} };

const { getRouteFromURL, setURLParam, deleteURLParam } = require('../../src/lib/router.js');

// Test getRouteFromURL
assert.strictEqual(getRouteFromURL(), '#/home');

// Test setURLParam adds param
setURLParam('foo', 'bar');
assert.strictEqual(moonsault.urlParams.params.foo, 'bar');

// Test deleteURLParam removes param
deleteURLParam('foo');
assert.strictEqual(moonsault.urlParams.params.foo, undefined);

console.log('✓ router.test.js');
