import { defineConfig } from 'astro/config';

// GitHub Pages: https://<user>.github.io/<repo>/
// После покупки домена: site = 'https://домен.ru', base = '/'
export default defineConfig({
  site: process.env.SITE_URL || 'https://takedown-desing.github.io',
  base: process.env.BASE_PATH ?? '/maniglia-shop',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
});
