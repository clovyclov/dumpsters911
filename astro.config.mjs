import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dumpsters911.com',
  integrations: [sitemap()],
});
