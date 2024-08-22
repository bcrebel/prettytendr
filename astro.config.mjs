import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: 'https://bcrebel.github.io',
  base: '/prettytendr',
  integrations: [react(), tailwind()],
  output: 'hybrid',
  adapter: node({
    mode: "standalone"
  })
});