# Задание: наполнить пустые и «тонкие» разделы реальными товарами

Формат товара — строго `src/data/PRODUCT-SCHEMA.md`, плюс у КАЖДОГО варианта с картинкой поле `imageSrc` (полный URL, откуда скачан файл).
Категории — только URL из `src/data/_catalog-urls.json` (самый глубокий подходящий, type subcategory/category, НЕ tag).
Уже существующие slug — `src/data/_existing-slugs.txt`: не дублировать модели.

Жёсткие правила:
- Только бренды магазина: morelli, fuaro, punto, armadillo, agb, krona-koblenz, colombo-design, fratelli-cattini, fantom, verum, ajax, class, tupai, extreza, otlav, lockstyle, venezia, forme, pamar, melodia, comaglio, porta-di-parma.
- Только реально существующие модели, факты и цены с реальных страниц российских магазинов/брендов. Нет цены — null.
- **Картинки НЕЛЬЗЯ брать с todoor.ru** (водяной знак). Никаких фото с водяными знаками магазинов. Логотип самого производителя допустим. Проверяй каждое фото инструментом Read.
- Картинка: curl с User-Agent браузера → `site/public/images/products/<slug>[-<color>].jpg` → `sips -Z 800 -s format jpeg -s formatOptions 75`. Без картинки товар НЕ добавлять (нужны карточки с фото).
- `description` своими словами, 2–4 предложения; без «—».
- Чтобы товар попал на ТЕГОВУЮ страницу, он должен быть в родительской категории тега и содержать маркер в name/description/specs:
  - `/catalog/dvernye-ruchki/magnitnye/` — «магнит» (ручки в комплекте с магнитной защёлкой);
  - `/catalog/dvernye-ruchki/s-fiksatorom/` — «фиксатор» или «WC» или doorTypes bathroom;
  - `/catalog/dvernye-ruchki/dlya-finskih-dverej/` — «финск»;
  - `/catalog/zavertki-i-nakladki/nakladki-dlya-vhodnyh-dverej/` — doorTypes содержит entrance;
  - `/catalog/zamki-dlya-vhodnyh-dverej/dlya-kalitki/` — «калитк» или «ворот»;
  - `/catalog/zamki-dlya-vhodnyh-dverej/protivopozharnye/` — «противопожар»;
  - `/catalog/zamki-dlya-vhodnyh-dverej/vreznye/suvaldnye/` — «сувальд»;
  - `/catalog/cilindry/s-perekodirovkoj/` — «перекодир»;
  - `/catalog/dovodchiki/dlya-steklyannyh-dverej/` — «стекл» или doorTypes glass;
  - `/catalog/zadvizhki-i-shpingalety/nochnye/` — «ночн»;
  - `/catalog/dvernye-petli/s-dovodchikom/` — «доводчик» или «самозакрыв»;
  - `/catalog/okonnaya-furnitura/okonnye-ruchki/s-klyuchom/` — «ключ».
- Хабы «по типу двери» берут товары по `doorTypes`: finnish (финские двери), gate (калитки и ворота), bathroom, glass, fire, pvc, aluminium, entrance, interior, sliding.
- Страницы серий: товар бренда серии, в name/series есть название серии (Scivola, Antologhia, Unique, Atomika, Spinoff, Tricks, Luxury, CompactTwin).
- Если для раздела у брендов магазина такого товара НЕ существует — не выдумывай, напиши об этом в финальном отчёте (раздел будет убран с сайта).
- Цель: у каждого раздела из твоего списка минимум 4 товара с фото (для страниц «бренд × категория» и серий — минимум 3).
- Сохраняй JSON-массив по ходу, в конце `json.load` и проверка, что все картинки существуют.
