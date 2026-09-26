// Конвертирует реестр страниц из SEO-проектирования (../research/structure/pages-registry.csv)
// в src/data/registry.json. В CI исходника нет — используется закоммиченный JSON.
import fs from 'node:fs';
import path from 'node:path';
const src = path.resolve('../research/structure/pages-registry.csv');
const out = path.resolve('src/data/registry.json');
if (!fs.existsSync(src)) { console.log('[prepare-data] registry source not found, using committed', out); process.exit(0); }
const text = fs.readFileSync(src, 'utf8');
function parseCSV(t) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}
const [head, ...rows] = parseCSV(text);
const data = rows.filter(r => r.length > 1).map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])))
  .map(r => ({ url: r.url, h1: r.h1, type: r.type, priority: r.priority, primaryKw: r.primary_kw, ws: +r.ws_sum || 0, parent: r.parent, note: r.note }));
fs.writeFileSync(out, JSON.stringify(data, null, 1));
console.log('[prepare-data] registry:', data.length, 'pages');
