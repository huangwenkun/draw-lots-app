const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');

console.log('Testing Chinese characters in file...');
console.log('File path:', filePath);

// ????????????
if (!fs.existsSync(filePath)) {
  console.log('File does not exist');
  process.exit(1);
}

// ??????
const content = fs.readFileSync(filePath, 'utf8');

// ?????????????
const chinesePattern = /[\u4e00-\u9fa5]/;
const hasChinese = chinesePattern.test(content);

console.log('Has Chinese characters:', hasChinese);

// ????HTML????????
const chineseChars = content.match(/[\u4e00-\u9fa5]+/g);
if (chineseChars) {
  console.log('First 10 Chinese strings found:', chineseChars.slice(0, 10));
}

// ???????
const testPath = path.join(__dirname, 'test-output.html');
fs.writeFileSync(testPath, content, { encoding: 'utf8' });
console.log('Test file written to:', testPath);

// ???
const verifyContent = fs.readFileSync(testPath, 'utf8');
const verifyChinese = verifyContent.match(/[\u4e00-\u9fa5]+/g);
if (verifyChinese) {
  console.log('Verification - Chinese in output:', verifyChinese.slice(0, 10));
  console.log('SUCCESS: Chinese characters are correctly encoded');
} else {
  console.log('FAILED: No Chinese characters found in verification');
}
