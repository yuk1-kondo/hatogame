import { defineConfig } from 'vite'

export default defineConfig({
  base: '/hatogame/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true
  }
})
