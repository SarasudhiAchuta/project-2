import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS v4 — CSS-first, no tailwind.config.js needed
  ],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('highlight.js')) return 'highlight'
            if (id.includes('marked') || id.includes('dompurify')) return 'markdown'
            if (id.includes('react')) return 'vendor'
          }
        },
      },
    },
  },
})
