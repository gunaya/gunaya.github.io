import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// base: './' keeps asset paths relative so the build works both at
// https://gunaya.github.io/ (root) and any GitHub Pages sub-path.
export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
})
