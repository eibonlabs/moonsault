const assert = require('assert');

// Define minimal DOM element constructors for bind.js checks
class HTMLInputElement {}
class HTMLSelectElement {}
class HTMLTextAreaElement {}
global.HTMLInputElement = HTMLInputElement;
global.HTMLSelectElement = HTMLSelectElement;
global.HTMLTextAreaElement = HTMLTextAreaElement;

const { bind } = require('../../src/lib/bind.js');

// Test element binding with value (input)
const context1 = {};
const inputMock = new HTMLInputElement();
inputMock.value = '';
bind(context1, 'name', 'Alice', inputMock);
assert.strictEqual(inputMock.value, 'Alice');
context1.name = 'Bob';
assert.strictEqual(inputMock.value, 'Bob');

// Test element binding with textContent (div)
const context2 = {};
const divMock = { textContent: '' };
bind(context2, 'title', 'Hello', divMock);
assert.strictEqual(divMock.textContent, 'Hello');
context2.title = 'World';
assert.strictEqual(divMock.textContent, 'World');

// Test callback binding
const context3 = {};
let calledWith = null;
bind(context3, 'count', 1, (v) => { calledWith = v; });
assert.strictEqual(calledWith, 1);
context3.count = 5;
assert.strictEqual(calledWith, 5);

console.log('✓ bind.test.js');
