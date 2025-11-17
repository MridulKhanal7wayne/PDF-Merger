// server.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const { mergerPdfs } = require('./merge');
const fs = require('fs');


const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors()); // enable requests from React frontend
app.use('/static', express.static('public'));

const port = 5000; // backend port

app.post('/merge', upload.array('pdfs'), async (req, res) => {
  try {
    console.log('📂 Uploaded Files:', req.files);

    if (!req.files || req.files.length < 1) {
      return res.status(400).send('No files uploaded');
    }

    const pdfPaths = req.files.map(file => path.join(__dirname, file.path));
    const mergedPath = await mergerPdfs(pdfPaths);

    res.download(mergedPath, 'merged.pdf', err => {
      if (err) {
        console.error('Error sending file:', err);
      }
      // try cleanup of merged file after send
      try { if (fs.existsSync(mergedPath)) fs.unlinkSync(mergedPath); } catch(e) {}
    });
  } catch (err) {
    console.error('Merge route error:', err);
    // send error stack only in dev
    res.status(500).send(err.message || 'Error merging PDFs');
  }
});
