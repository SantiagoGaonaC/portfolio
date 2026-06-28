import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte"

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
  adapter: vercel({
    imageService: false, 
    webAnalytics: {
      enabled: true,
    },
    runtime: "nodejs24.x"
  })
});
