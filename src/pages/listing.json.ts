// Компактный индекс всех товаров для клиентского фильтра и пагинации.
import { products, brandName, minPrice, firstImage, productFacetValues } from '../lib/data';
export function GET() {
  const data = products.map((p) => {
    const v0 = p.variants.find((v) => v.image) || p.variants[0];
    return {
      s: p.slug, n: p.name, b: brandName(p.brand), p: minPrice(p), i: firstImage(p), m: p.variants.length,
      fin: v0.finish, vp: v0.price, vi: v0.image, f: productFacetValues(p),
    };
  });
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}
