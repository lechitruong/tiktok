import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', 
      '@features': '/src/features',
      '@site': '/src/site',
      '@utils': '/src/utils',
      '@components': '/src/components',
    },
  },
})
