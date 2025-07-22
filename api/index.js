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

  // Serve static background image directly
  if (path === '/bg.webp') {
    const fs = require('fs');
    const pathModule = require('path');
    const imgPath = pathModule.join(__dirname, '..', 'public', 'bg.webp');
    try {
      const img = fs.readFileSync(imgPath);
      res.setHeader('Content-Type', 'image/webp');
      return res.end(img);
    } catch (e) {
      res.writeHead(404);
      return res.end('Image not found');
    }
  }

  // Extract top path segment e.g. /route-whatever → route-whatever
  const service = path.replace(/^\//, '').split('/')[0];
  const targetUrl = `https://${service}.vercel.app`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${service} - Website Preview - GMG Web Design</title>
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
        background: linear-gradient(rgba(12,27,45,0.95), rgba(12,27,45,0.85)), url('/bg.webp') center/cover no-repeat;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 20px;
        box-sizing: border-box;
        flex-shrink: 0;
      }

      /* Thin bar above banner for preview note */
      .top-bar {
        background-color: #0C1B2D;
        color: #FFFFFF;
        text-align: center;
        font-size: 14px;
        padding: 4px 0;
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
        padding: 6px 14px;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        transition: opacity 0.2s ease;
        text-transform: uppercase;
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

      .right-section {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      /* banner-message no longer needed as message moved to top-bar */

      @media (max-width: 640px) {
        .banner {
          padding: 8px 12px;
          height: 50px;
        }
        
        .logo {
          height: 38px;
        }
        
        .button-group {
          gap: 8px;
        }
        
        .btn {
          padding: 8px 15px;
          font-size: 15px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="top-bar">This banner will be removed on the final site.</div>
      <div class="banner">
        <a href="https://gmgwebdesign.com" target="_blank">
          <img src="https://crm.gmgwebdesign.com/logo1.webp" alt="GMG Web Design" class="logo" />
        </a>
        <div class="right-section">
          <div class="button-group">
            <a href="https://gmgwebdesign.com/api/project-via-link/${service}?status=request-edit" target="_blank" class="btn btn-request">
              Request Edits
            </a>
            <a href="https://gmgwebdesign.com/api/project-via-link/${service}?status=approve" target="_blank" class="btn btn-approve">
              Approve
            </a>
          </div>
        </div>
      </div>
      <div class="iframe-container">
        <iframe class="proxy-frame" src="${targetUrl}" title="${service} preview" allowfullscreen></iframe>
      </div>
    </div>
  </body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
}; 