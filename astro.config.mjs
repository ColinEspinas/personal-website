import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://colinespinas.com',
  integrations: [tailwind(), sitemap(), svelte()],
  vite: {
    ssr: {
      external: ["svgo"]
    }
  }
});