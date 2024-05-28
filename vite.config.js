import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/Tennis_Data_Viz/',
  optimizeDeps: {
    include: ['d3']
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
})
