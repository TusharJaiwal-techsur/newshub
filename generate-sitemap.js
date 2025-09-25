// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFileSync } from 'fs';

const baseUrl = 'https://newshub-xi.vercel.app';

const staticRoutes = [
  '/', '/allArticles', '/about', '/contact', '/privacy', '/terms'
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: baseUrl });

  staticRoutes.forEach(route => {
    sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
  });

  const articles = [1, 2, 3];
  articles.forEach(id => sitemap.write({ url: `/article/${id}`, changefreq: 'daily', priority: 0.9 }));

  const categories = ['news', 'tech', 'sports'];
  categories.forEach(cat => sitemap.write({ url: `/category/${cat}`, changefreq: 'daily', priority: 0.7 }));

  sitemap.end();

  const xml = await streamToPromise(sitemap).then(sm => sm.toString());
  writeFileSync('./public/sitemap.xml', xml);
  console.log('✅ Sitemap generated at public/sitemap.xml');
}

generateSitemap();
