// Печатает список файлов public/images/products, разрешённых к публикации
// (есть imageSrc и он не с todoor.ru). Используется перед git add.
import fs from 'node:fs';
const dir = 'src/data/products';
const allowed = new Set();
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  for (const p of JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'))) {
    for (const v of p.variants || []) {
      if (v?.image && v.imageSrc && !/todoor\.ru/i.test(v.imageSrc) && fs.existsSync('public' + v.image)) allowed.add('public' + v.image);
    }
  }
}
process.stdout.write([...allowed].join('\n') + '\n');
