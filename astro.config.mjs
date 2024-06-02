import { defineConfig, passthroughImageService } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true
  },
  site: 'djpablitodyr',
  base: '/',
  integrations: [react(), tailwind()],
  trailingSlash: "always",

});