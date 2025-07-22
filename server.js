const express = require('express');
const handler = require('./api/index.js');

const app = express();

// Serve static assets from public directory
app.use(express.static('public'));

// Fallback to serverless handler for everything else
app.use((req, res) => {
  return handler(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Preview server running → http://localhost:${PORT}`);
}); 