// Serverless function for Vercel to proxy-like embed target apps in iframe

module.exports = (req, res) => {
  const path = req.url.split('?')[0] || '/';

  // Root or blank path → redirect
  if (path === '/' || path === '') {
    res.writeHead(302, {
      Location: 'https://gmgwebdesign.com',
    });
    return res.end();
  }

  // Extract top path segment e.g. /route-whatever → route-whatever
  const service = path.replace(/^\//, '').split('/')[0];
  const targetUrl = `https://${service}.vercel.app`;

  const html = `<!DOCTYPE html>
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
      <iframe class="proxy-frame" src="${targetUrl}" title="${service} preview" allowfullscreen></iframe>
    </div>
  </body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
}; 