import { defineConfig, passthroughImageService } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true
  },
  site: 'https://djpablitodyr.cl',
  integrations: [
    react(), 
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CL',
        },
      },
    })
  ],
  trailingSlash: "always",
});