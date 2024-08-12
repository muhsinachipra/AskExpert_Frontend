import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

const { VITE_BASE_URL } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: VITE_BASE_URL,
        changeOrigin: true,
      }
    }
  },
  define: {
    'process.env': process.env
  }
})
