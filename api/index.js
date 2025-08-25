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
  
  // Redirect to admin preview page
  res.writeHead(302, {
    Location: `https://admin.gmgwebdesign.com/preview/${service}`,
  });
  return res.end();
}; 