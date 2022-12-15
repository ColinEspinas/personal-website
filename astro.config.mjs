import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

import { remarkReadingTime } from './src/plugins/remark/reading-time.mjs';
import rehypeSlug from 'rehype-slug';
import rehypeAutolink from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://colinespinas.com',
  integrations: [tailwind(), sitemap(), svelte(), mdx({
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolink, { behavior: 'wrap' }],
    ],
    remarkPlugins: [
      remarkReadingTime,
    ],
  })],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
});