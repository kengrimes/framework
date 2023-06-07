import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';

let _buildConfig = {};

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [
    {
      name: "ssg-import-nullifier",
      hooks: {
        "astro:config:done": ({config}) => _buildConfig = config.build,
        "astro:build:done": () => {
          const entryPath = fileURLToPath(new URL(_buildConfig.serverEntry, _buildConfig.server));
          const entry = readFileSync(entryPath, "utf8");
          const newEntry = entry.replace("import 'trpc-panel';", "");
          writeFileSync(entryPath, newEntry);
        },
      },
    },
  ],
  vite: {
    build: {
      // Minified files don't source map correctly in Cloudflare Workers
      // This helps with debugging by exposing the source code in dev mode
      minify: import.meta.env.PROD,
    },
  },
});
