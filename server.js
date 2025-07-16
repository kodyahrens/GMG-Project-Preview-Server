const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Catch routes like /my-app and embed https://my-app.vercel.app
 * in a full-screen iframe that is mobile responsive.
 */
app.get('/:service', (req, res) => {
  const { service } = req.params;
  const targetUrl = `https://${service}.vercel.app`;

  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview – ${service}</title>
    <style>
      html, body {
        margin: 0;
        height: 100%;
        width: 100%;
      }

      .iframe-container {
        display: flex;
        height: 100%;
        width: 100%;
      }

      .proxy-frame {
        flex: 1 1 auto;
        border: none;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="iframe-container">
      <iframe
        class="proxy-frame"
        src="${targetUrl}"
        title="${service} preview"
        allowfullscreen
      ></iframe>
    </div>
  </body>
</html>`);
});

// Root path redirects to GMG site
app.get('/', (_, res) => {
  res.redirect('https://gmgwebdesign.com');
});

// Fallback for any unmatched routes
app.use((_, res) => {
  res.redirect('https://gmgwebdesign.com');
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
}); 