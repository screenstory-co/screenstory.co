import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://screenstory-co.preview.screenstory.co',
  output: 'static',
  build: {
    format: 'directory'
  }
});