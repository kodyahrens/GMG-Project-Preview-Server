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
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      }

      .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
      }

      .banner {
        background-color: #0C1B2D;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 20px;
        box-sizing: border-box;
        flex-shrink: 0;
      }

      .logo {
        height: 70px;
        width: auto;
      }

      .button-group {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        font-size: 18px;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        transition: opacity 0.2s ease;
      }

      .btn:hover {
        opacity: 0.9;
      }

      .btn-request {
        background-color: #4B5563;
        color: white;
      }

      .btn-approve {
        background-color: #FACC14;
        color: black;
      }

      .iframe-container {
        flex: 1;
        display: flex;
        width: 100%;
        overflow: hidden;
      }

      .proxy-frame {
        flex: 1 1 auto;
        border: none;
        width: 100%;
        height: 100%;
      }

      @media (max-width: 640px) {
        .banner {
          padding: 8px 12px;
        }
        
        .logo {
          height: 64px;
        }
        
        .button-group {
          gap: 8px;
        }
        
        .btn {
          padding: 6px 15px;
          font-size: 16px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="banner">
        <a href="https://gmgwebdesign.com" target="_blank">
          <img src="https://crm.gmgwebdesign.com/logo1.webp" alt="GMG Web Design" class="logo" />
        </a>
        <div class="button-group">
          <a href="https://gmgwebdesign.com/api/project-via-link/${service}?status=request-edit" target="_blank" class="btn btn-request">
            Request Edits
          </a>
          <a href="https://gmgwebdesign.com/api/project-via-link/${service}?status=approve" target="_blank" class="btn btn-approve">
            Approve
          </a>
        </div>
      </div>
      <div class="iframe-container">
        <iframe
          class="proxy-frame"
          src="${targetUrl}"
          title="${service} preview"
          allowfullscreen
        ></iframe>
      </div>
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