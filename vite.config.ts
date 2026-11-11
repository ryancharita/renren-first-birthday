import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://ryancharita.github.io/renren-first-birthday/
  base: '/renren-first-birthday/',
  plugins: [react()],
})
