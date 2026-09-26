// Единый слой данных сайта: реестр страниц (SEO-проектирование), товары, тексты.
import registryRaw from '../data/registry.json';

export type RegPage = { url: string; h1: string; type: string; priority: string; primaryKw: string; ws: number; parent: string; note: string };
export type Variant = { finish: string; color: string; article?: string; price: number | null; inStock?: boolean; image: string | null };
export type Product = {
  slug: string; name: string; brand: string; series: string | null; category: string; article?: string;
  variants: Variant[]; material?: string | null; style?: string | null; doorTypes?: string[];
  specs?: Record<string, string>; description?: string; sourceUrl?: string;
};
export type PageText = { url: string; title?: string; description?: string; h1?: string; lead?: string; text?: string; faq?: { q: string; a: string }[] };
export type BrandText = {
  slug: string; name: string; country?: string; founded?: string; segment?: string; tagline?: string; title?: string; description?: string; text?: string;
  series?: string[]; categories?: Record<string, { title?: string; description?: string; lead?: string; text?: string }>;
};
export type Article = { slug: string; hub: string; title: string; description: string; h1: string; date: string; author: string; readingMinutes?: number; body: string; faq?: { q: string; a: string }[]; related?: string[] };
export type Service = { url: string; title: string; description: string; h1: string; body: string };
export type Series = { slug: string; name: string; brand: string; title?: string; description?: string; text?: string };

export const SITE_NAME = 'MANIGLIA';
export const PHONE = '+7 (000) 000-00-00';
export const EMAIL = 'info@example.com';

export const registry = (registryRaw as RegPage[]).map((p) => ({ ...p, h1: p.h1.replace(/\s+—\s+/g, ': ') }));
export const regByUrl = new Map(registry.map((p) => [p.url, p]));

// ---------- загрузка JSON-файлов (любой из них может ещё отсутствовать)
function loadArray<T>(mods: Record<string, unknown>): T[] {
  const out: T[] = [];
  for (const m of Object.values(mods)) {
    const d = (m as { default?: unknown }).default ?? m;
    if (Array.isArray(d)) out.push(...(d as T[]));
  }
  return out;
}
const productMods = import.meta.glob('../data/products/*.json', { eager: true });
const pagesMods = import.meta.glob('../data/content/pages.json', { eager: true });
const brandsMods = import.meta.glob('../data/content/brands.json', { eager: true });
const seriesMods = import.meta.glob('../data/content/series.json', { eager: true });
const articlesMods = import.meta.glob('../data/content/articles.json', { eager: true });
const serviceMods = import.meta.glob('../data/content/service.json', { eager: true });

function cleanProduct(p: Product): Product | null {
  if (!p || !p.slug || !p.name || !p.category) return null;
  const variants = (p.variants || []).filter(Boolean);
  if (!variants.length) return null;
  const cat = p.category.endsWith('/') ? p.category : p.category + '/';
  return { ...p, category: cat, variants, doorTypes: p.doorTypes || [] };
}
const seen = new Set<string>();
export const products: Product[] = loadArray<Product>(productMods)
  .map(cleanProduct)
  .filter((p): p is Product => !!p && !seen.has(p.slug) && (seen.add(p.slug), true));
export const productBySlug = new Map(products.map((p) => [p.slug, p]));

export const pageTexts = new Map(loadArray<PageText>(pagesMods).map((t) => [t.url, t]));
export const brandTexts = new Map(loadArray<BrandText>(brandsMods).map((b) => [b.slug, b]));
export const seriesTexts = new Map(loadArray<Series>(seriesMods).map((s) => [s.slug, s]));
export const articles = loadArray<Article>(articlesMods);
export const services = new Map(loadArray<Service>(serviceMods).map((s) => [s.url, s]));

// ---------- бренды
export const BRANDS: { slug: string; name: string; tier: string }[] = [
  ['morelli', 'Morelli', 'A'], ['fuaro', 'FUARO', 'A'], ['punto', 'PUNTO', 'A'], ['armadillo', 'Armadillo', 'A'], ['agb', 'AGB', 'A'],
  ['krona-koblenz', 'Krona Koblenz', 'A'], ['colombo-design', 'Colombo Design', 'A'], ['fratelli-cattini', 'Fratelli Cattini', 'A'],
  ['fantom', 'FANTOM', 'B'], ['verum', 'Verum', 'B'], ['ajax', 'AJAX', 'B'], ['class', 'CLASS', 'B'], ['tupai', 'TUPAI', 'B'],
  ['extreza', 'Extreza', 'B'], ['otlav', 'Otlav', 'B'], ['lockstyle', 'LockStyle', 'B'], ['venezia', 'VENEZIA', 'B'], ['forme', 'FORME', 'B'],
  ['pamar', 'Pamar', 'C'], ['melodia', 'MELODIA', 'C'], ['comaglio', 'Comaglio', 'C'], ['porta-di-parma', 'Porta di Parma', 'C'],
].map(([slug, name, tier]) => ({ slug, name, tier }));
export const brandName = (slug: string) => BRANDS.find((b) => b.slug === slug)?.name ?? slug;

// ---------- навигация: 16 разделов каталога + иконки
export const CATEGORY_NAV: { url: string; name: string; icon: string }[] = [
  { url: '/catalog/dvernye-ruchki/', name: 'Дверные ручки', icon: 'handle' },
  { url: '/catalog/zavertki-i-nakladki/', name: 'WC-завертки и накладки', icon: 'rosette' },
  { url: '/catalog/mezhkomnatnye-zamki/', name: 'Межкомнатные замки', icon: 'lock' },
  { url: '/catalog/zamki-dlya-vhodnyh-dverej/', name: 'Замки для входных дверей', icon: 'padlock' },
  { url: '/catalog/cilindry/', name: 'Цилиндры', icon: 'cylinder' },
  { url: '/catalog/dvernye-petli/', name: 'Дверные петли', icon: 'hinge' },
  { url: '/catalog/dovodchiki/', name: 'Доводчики', icon: 'closer' },
  { url: '/catalog/razdvizhnye-sistemy/', name: 'Раздвижные системы', icon: 'slide' },
  { url: '/catalog/upory-i-ogranichiteli/', name: 'Упоры и ограничители', icon: 'stop' },
  { url: '/catalog/zadvizhki-i-shpingalety/', name: 'Задвижки и шпингалеты', icon: 'bolt' },
  { url: '/catalog/glazki-i-aksessuary/', name: 'Глазки и аксессуары', icon: 'eye' },
  { url: '/catalog/avtoporogi-i-uplotniteli/', name: 'Автопороги', icon: 'seal' },
  { url: '/catalog/furnitura-dlya-steklyannyh-dverej/', name: 'Для стеклянных дверей', icon: 'glass' },
  { url: '/catalog/okonnaya-furnitura/', name: 'Оконная фурнитура', icon: 'window' },
  { url: '/catalog/mebelnaya-furnitura/', name: 'Мебельная фурнитура', icon: 'furniture' },
  { url: '/catalog/komplekty-furnitury/', name: 'Комплекты на дверь', icon: 'kit' },
];
export const DOOR_TYPES = registry.filter((p) => p.type === 'door-type');

// ---------- теги (фасетные посадочные): правило выборки
const COLOR_TAGS: Record<string, string> = { chernye: 'black', belye: 'white', zoloto: 'gold', hrom: 'chrome', bronza: 'bronze', nikel: 'nickel', latun: 'brass', grafit: 'graphite', med: 'copper' };
const STYLE_TAGS: Record<string, string[]> = { klassika: ['classic'], sovremennye: ['modern', 'minimal'], loft: ['loft'] };
export const COLOR_NAMES: Record<string, string> = { black: 'чёрный', chrome: 'хром', gold: 'золото', bronze: 'бронза', nickel: 'никель', brass: 'латунь', white: 'белый', graphite: 'графит', copper: 'медь', silver: 'серебро', other: 'другое' };
export const COLOR_HEX: Record<string, string> = { black: '#1d1d1f', chrome: '#c9ccd1', gold: '#c9a54a', bronze: '#8a6a45', nickel: '#a9a7a0', brass: '#b89b53', white: '#f4f4f2', graphite: '#4a4c50', copper: '#b06f4a', silver: '#d8d8d8', other: '#bbb' };

const has = (p: Product, re: RegExp) => re.test([p.name, p.description, JSON.stringify(p.specs || {}), p.material].join(' ').toLowerCase());

export function tagRule(url: string): ((p: Product) => boolean) | null {
  const parts = url.split('/').filter(Boolean); // catalog, cat, [sub], tag
  const slug = parts[parts.length - 1];
  const parentUrl = '/' + parts.slice(0, -1).join('/') + '/';
  const inParent = (p: Product) => p.category.startsWith(parentUrl);
  if (COLOR_TAGS[slug]) return (p) => inParent(p) && p.variants.some((v) => v.color === COLOR_TAGS[slug]);
  if (STYLE_TAGS[slug]) return (p) => inParent(p) && STYLE_TAGS[slug].includes(p.style || '');
  const map: Record<string, (p: Product) => boolean> = {
    'kruglaya-rozetka': (p) => has(p, /кругл/),
    'kvadratnaya-rozetka': (p) => has(p, /квадратн/),
    's-zamkom': (p) => has(p, /с замк|под цилиндр|под ключ/),
    's-fiksatorom': (p) => has(p, /фиксатор|wc|завертк|сантехн/) || (p.doorTypes || []).includes('bathroom'),
    italyanskie: (p) => ['colombo-design', 'venezia', 'fratelli-cattini', 'forme', 'class', 'melodia', 'verum', 'pamar'].includes(p.brand) || has(p, /итал/),
    magnitnye: (p) => has(p, /магнит/),
    'dlya-finskih-dverej': (p) => has(p, /финск/),
    besshumnye: (p) => has(p, /бесшумн|магнит/),
    'nakladki-dlya-vhodnyh-dverej': (p) => (p.doorTypes || []).includes('entrance'),
    's-perekodirovkoj': (p) => has(p, /перекодир/),
    's-dovodchikom': (p) => has(p, /доводчик|самозакрыв|kiker/),
    's-klyuchom': (p) => has(p, /ключ/),
    'dlya-steklyannyh-dverej': (p) => has(p, /стекл/) || (p.doorTypes || []).includes('glass'),
    's-fiksaciej': (p) => has(p, /фиксац/),
    ulichnye: (p) => has(p, /морозо|уличн|-\s?\d{2}\s?°|°c/),
    'dlya-tyazhelyh-dverej': (p) => has(p, /(1[0-9]{2}|[8-9][0-9])\s?кг/),
    cilindrovye: (p) => has(p, /цилиндр/),
    suvaldnye: (p) => has(p, /сувальд/),
    'dlya-kalitki': (p) => has(p, /калитк|ворот/),
    protivopozharnye: (p) => has(p, /противопожар|огнест|ei\s?\d/),
    chernye: (p) => p.variants.some((v) => v.color === 'black'),
    nochnye: (p) => has(p, /ночн/),
  };
  const fn = map[slug];
  return fn ? (p) => inParent(p) && fn(p) : null;
}

// ---------- выборки товаров для страницы реестра
export function productsFor(url: string): Product[] {
  const reg = regByUrl.get(url);
  if (!reg) return [];
  if (reg.type === 'tag') { const r = tagRule(url); return r ? products.filter(r) : []; }
  if (reg.type === 'brand') { const b = url.split('/')[2]; return products.filter((p) => p.brand === b); }
  if (reg.type === 'brand-category') {
    const [, , b, c] = url.split('/');
    const catUrl = BRAND_CAT_MAP[c] || `/catalog/${c}/`;
    return products.filter((p) => p.brand === b && p.category.startsWith(catUrl));
  }
  if (reg.type === 'series') {
    const slug = url.split('/')[2];
    const s = SERIES_RULES[slug];
    return s ? products.filter((p) => p.brand === s.brand && s.re.test((p.series || '') + ' ' + p.name)) : [];
  }
  if (reg.type === 'door-type') {
    const key = DOOR_TYPE_KEYS[url] || '';
    return products.filter((p) => (p.doorTypes || []).includes(key));
  }
  if (url === '/catalog/komplekty-furnitury/') return [];
  if (url === '/catalog/') return products;
  return products.filter((p) => p.category.startsWith(url));
}
export const BRAND_CAT_MAP: Record<string, string> = {
  'skrytye-petli': '/catalog/dvernye-petli/skrytye/',
  'magnitnye-zamki': '/catalog/mezhkomnatnye-zamki/magnitnye/',
  'okonnye-ruchki': '/catalog/okonnaya-furnitura/okonnye-ruchki/',
};
export const DOOR_TYPE_KEYS: Record<string, string> = {
  '/furnitura-dlya-mezhkomnatnyh-dverej/': 'interior', '/furnitura-dlya-vhodnyh-dverej/': 'entrance', '/furnitura-dlya-razdvizhnyh-dverej/': 'sliding',
  '/furnitura-dlya-steklyannyh-dverej/': 'glass', '/furnitura-dlya-pvh-dverej/': 'pvc', '/furnitura-dlya-alyuminievyh-dverej/': 'aluminium',
  '/furnitura-dlya-protivopozharnyh-dverej/': 'fire', '/furnitura-dlya-finskih-dverej/': 'finnish', '/furnitura-dlya-kalitok-i-vorot/': 'gate', '/furnitura-dlya-vannoy-i-tualeta/': 'bathroom',
};
export const SERIES_RULES: Record<string, { brand: string; re: RegExp }> = {
  'krona-koblenz-kubica': { brand: 'krona-koblenz', re: /kubica/i }, 'krona-koblenz-atomika': { brand: 'krona-koblenz', re: /atomika/i },
  'krona-koblenz-spinoff': { brand: 'krona-koblenz', re: /spinoff/i }, 'krona-koblenz-tricks': { brand: 'krona-koblenz', re: /tricks/i },
  'agb-eclipse': { brand: 'agb', re: /eclipse/i }, 'agb-polaris': { brand: 'agb', re: /polaris/i }, 'agb-mediana': { brand: 'agb', re: /mediana/i },
  'agb-scivola': { brand: 'agb', re: /scivola/i }, 'colombo-design-robot': { brand: 'colombo-design', re: /robo/i },
  'colombo-design-antologhia': { brand: 'colombo-design', re: /antolog/i }, 'armadillo-urban': { brand: 'armadillo', re: /urban/i },
  'morelli-luxury': { brand: 'morelli', re: /luxury/i }, 'fratelli-cattini-compacttwin': { brand: 'fratelli-cattini', re: /compact/i },
  'tupai-5s': { brand: 'tupai', re: /5s/i }, 'venezia-unique': { brand: 'venezia', re: /unique/i },
};

// ---------- утилиты
export const minPrice = (p: Product) => {
  const ps = p.variants.map((v) => v.price).filter((x): x is number => typeof x === 'number' && x > 0);
  return ps.length ? Math.min(...ps) : null;
};
export const rub = (n: number | null | undefined) => (n ? new Intl.NumberFormat('ru-RU').format(n) + ' ₽' : 'Цена по запросу');
export const firstImage = (p: Product | undefined | null) => p?.variants.find((v) => v.image)?.image ?? null;
export const children = (url: string, types?: string[]) => registry.filter((p) => p.parent === url && p.url !== url && (!types || types.includes(p.type)));
export const INDEX_THRESHOLD: Record<string, number> = { tag: 3, 'brand-category': 2, subcategory: 1, series: 1, category: 1 };
export function isIndexable(url: string): boolean {
  const reg = regByUrl.get(url);
  if (!reg) return true;
  if (reg.priority === 'GAP') return productsFor(url).length > 0;
  const th = INDEX_THRESHOLD[reg.type];
  if (th === undefined) return true;
  if (reg.type === 'category' && children(url).length) return true;
  return productsFor(url).length >= th;
}
export function breadcrumbs(url: string): { url: string; name: string }[] {
  const out: { url: string; name: string }[] = [];
  let cur = regByUrl.get(url);
  while (cur && cur.url !== '/') {
    out.unshift({ url: cur.url, name: shortName(cur) });
    cur = cur.parent ? regByUrl.get(cur.parent) : undefined;
  }
  out.unshift({ url: '/', name: 'Главная' });
  return out;
}
export function shortName(p: RegPage) {
  const t = pageTexts.get(p.url);
  let n = t?.h1 || p.h1;
  if (p.url === '/') n = 'Главная';
  if (p.url === '/catalog/') n = 'Каталог';
  return n.replace(/^Дверная фурнитура (.+)$/, '$1');
}
