// merge.js
const PDFMerger = require('pdf-merger-js');
const path = require('path');

async function mergerPdfs(pdfFiles) {
  const merger = new PDFMerger();

  for (const pdf of pdfFiles) {
    await merger.add(pdf);
  }

  const outputPath = path.join(__dirname, 'public', 'merged.pdf');
  await merger.save(outputPath);
  console.log('✅ PDF merged successfully!');
  return outputPath;
}

module.exports = { mergerPdfs };
