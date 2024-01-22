import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:
    {
      '/BDG_3':{
        target: "http://localhost:3000/",
        changeOrigin: true
      },
      '/BDGtiles':{
        target: "http://localhost:3000/",
        changeOrigin: true
      },
    },
  },
})
