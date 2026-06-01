const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');

// ??????
const content = fs.readFileSync(filePath, 'utf8');

// ??????UTF-8????????????
fs.writeFileSync(filePath, content, { encoding: 'utf8' });

console.log('File saved with UTF-8 encoding');

// ??????
const verifyContent = fs.readFileSync(filePath, 'utf8');
console.log('File encoding verified');
console.log('First 200 characters:', verifyContent.substring(0, 200));
