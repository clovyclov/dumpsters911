import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dumpsters911.com',
  output: 'static',
  build: {
    format: 'directory'
  }
});
