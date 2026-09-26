import type { APIContext } from 'astro';
import { registry, products, articles, isIndexable } from '../lib/data';
import { abs } from '../lib/url';
const SKIP = ['/search/', '/cart/', '/compare/', '/account/', '/new/', '/product/{slug}/', '/politika-konfidencialnosti/', '/publichnaya-oferta/'];
export function GET({ site }: APIContext) {
  const today = new Date().toISOString().slice(0, 10);
  const pr: Record<string, string> = { home: '1.0', category: '0.9', subcategory: '0.8', brand: '0.8', 'brand-hub': '0.7', tag: '0.7', 'brand-category': '0.7', series: '0.6', 'door-type': '0.7', kit: '0.7', article: '0.6', 'blog-hub': '0.5', utility: '0.4', b2b: '0.5' };
  const valid = new Set(articles.map((a) => `/blog/${a.slug}/`));
  const pages = registry.filter((p) => !SKIP.includes(p.url) && (p.type !== 'article' || valid.has(p.url)) && isIndexable(p.url));
  const urls = [
    ...pages.map((p) => ({ loc: abs(site, p.url), pr: pr[p.type] || '0.5' })),
    ...articles.filter((a) => !registry.some((r) => r.url === `/blog/${a.slug}/`)).map((a) => ({ loc: abs(site, `/blog/${a.slug}/`), pr: '0.6' })),
    ...products.map((p) => ({ loc: abs(site, `/product/${p.slug}/`), pr: '0.6' })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((x) => `<url><loc>${x.loc}</loc><lastmod>${today}</lastmod><priority>${x.pr}</priority></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
