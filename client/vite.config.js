import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This handles all the Tailwind magic for you!
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})