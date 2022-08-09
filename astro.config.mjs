import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

import { remarkReadingTime } from './plugins/remark/reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://colinespinas.com',
  integrations: [tailwind(), sitemap(), svelte(), mdx({
    remarkPlugins: { extends: [remarkReadingTime] },
  })],
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
});