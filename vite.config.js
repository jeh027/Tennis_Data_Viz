import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/Tennis_Data_Viz/',
  build: {
    rollupOptions: {
      external: ['d3'],
    },
  },
})
