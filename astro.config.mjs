import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sumbersaranasolusindo.co.id',

  integrations: [
    sitemap(),
  ],

  output: 'static',

  vite: {
    css: {
      // Tailwind v3 via PostCSS (no Astro integration needed in v6)
      postcss: {
        plugins: [
          (await import('tailwindcss')).default,
        ],
      },
    },
  },
});
