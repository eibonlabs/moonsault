#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function loadTestFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(f => f.endsWith('.test.js')).map(f => path.join(dir, f));
}

function runTest(file) {
  try {
    require(file);
    console.log(`✓ ${file}`);
  } catch (e) {
    console.error(`✗ ${file}`);
    console.error(e.stack || e);
  }
}

const testDir = path.resolve(__dirname, 'utils');
const files = loadTestFiles(testDir);
files.forEach(runTest);

console.log(`\nRan ${files.length} test(s).`);
