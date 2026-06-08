import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');
  const posts = await getCollection('blog');

  const pageUrls = pages.map(p => ({
    url: `https://screenstory-co.pages.dev/${p.slug === 'index' ? '' : p.slug + '/'}`,
    lastmod: new Date().toISOString().split('T')[0],
    priority: p.slug === 'index' ? '1.0' : '0.8'
  }));

  const blogUrls = posts.map(p => ({
    url: `https://screenstory-co.pages.dev/blog/${p.slug}/`,
    lastmod: p.data.date || new Date().toISOString().split('T')[0],
    priority: '0.6'
  }));

  const allUrls = [
    ...pageUrls,
    ...blogUrls,
    { url: 'https://screenstory-co.pages.dev/blog/', lastmod: new Date().toISOString().split('T')[0], priority: '0.7' }
  ];

  const xml = `\u003c?xml version="1.0" encoding="UTF-8"?\u003e\n` +
    `\u003curlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\u003e\n` +
    allUrls.map(u =>
      `  \u003curl\u003e\n` +
      `    \u003cloc\u003e${u.url}\u003c/loc\u003e\n` +
      `    \u003clastmod\u003e${u.lastmod}\u003c/lastmod\u003e\n` +
      `    \u003cpriority\u003e${u.priority}\u003c/priority\u003e\n` +
      `  \u003c/url\u003e`
    ).join('\n') +
    `\n\u003c/urlset\u003e`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};