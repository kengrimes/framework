import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),

  vite: {
    build: {
      // Minified files don't source map correctly in Cloudflare Workers
      // This helps with debugging by exposing the source code in dev mode
      minify: import.meta.env.PROD,
    }
  }
});