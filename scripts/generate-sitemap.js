import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const BACKEND_URL = 'https://cm-housing.onrender.com/api/houses';
const DOMAIN = 'https://cmhousing.com';
const PUBLIC_DIR = path.join(__dirname, '../public');

async function fetchHouses() {
  return new Promise((resolve, reject) => {
    https.get(BACKEND_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function generateSitemap() {
  console.log('🗺️  Generating Sitemap...');

  try {
    const houses = await fetchHouses();

    // API returns { houses: [...], hasMore: true, ... }
    const houseList = Array.isArray(houses) ? houses : (houses.houses || houses.data || []);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${houseList.map(house => `
  <url>
    <loc>${DOMAIN}/house/${house._id}</loc>
    <lastmod>${new Date(house.updatedAt || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
    console.log(`✅ Sitemap generated with ${houseList.length} houses!`);

  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error.message);
    // Create a basic fallback sitemap so the build doesn't fail
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${DOMAIN}/</loc></url>
</urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), fallback);
  }
}

generateSitemap();
