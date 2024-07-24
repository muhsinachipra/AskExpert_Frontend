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


// // import dotenv package
// import dotenv from 'dotenv';
// import { defineConfig } from 'vite';

// // run package config
// dotenv.config();
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// // define process env
//   define: {
//     'process.env': process.env
//   }
// });



// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000/api',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     }
//   },
//   define: {
//     'process.env': process.env
//   }

// })