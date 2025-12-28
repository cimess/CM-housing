# Implementation Plan - Dynamic Sitemap

## Goal
Help Google discover all your property listings automatically. We will create a dynamic `/sitemap.xml` endpoint on your backend that lists every single house URL.

## User Review Required
> [!IMPORTANT]
> You will need to submit this sitemap URL to **Google Search Console** once you deploy.
> URL will be: `YOUR_BACKEND_URL/sitemap.xml`

## Proposed Changes

### [Backend] `mern-auth-backend/server.js`
-   Add a new route `/sitemap.xml`.
-   Fetch all houses from the database (selecting only `_id` and `updatedAt`).
-   Generate XML string pointing to your frontend URLs.

#### [MODIFY] [server.js](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/mern-auth-backend/server.js)
```javascript
// ... imports
const House = require("./models/House");

app.get('/sitemap.xml', async (req, res) => {
  try {
    const houses = await House.find({}, '_id updatedAt');
    const frontendUrl = process.env.FRONTEND_URL || 'https://cmhousing.com';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${frontendUrl}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${houses.map(house => `
        <url>
          <loc>${frontendUrl}/house/${house._id}</loc>
          <lastmod>${new Date(house.updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (err) {
    res.status(500).end();
  }
});
```

## Verification Plan

### Manual Verification
1.  Start the backend.
2.  Visit `http://localhost:5000/sitemap.xml` in the browser.
3.  Verify it returns a valid XML list of URLs.
