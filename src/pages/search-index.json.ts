import { products, brandName, minPrice, firstImage, regByUrl, COLOR_NAMES } from '../lib/data';
export function GET() {
  const data = products.map((p) => ({
    u: `product/${p.slug}/`, n: p.name, b: brandName(p.brand), p: minPrice(p), i: (firstImage(p) || '').replace(/^\//, ''),
    s: [p.name, brandName(p.brand), p.series, p.article, regByUrl.get(p.category)?.h1, ...p.variants.map((v) => `${v.finish} ${COLOR_NAMES[v.color] || ''} ${v.article || ''}`)].join(' ').toLowerCase().replace(/ё/g, 'е'),
  }));
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}
