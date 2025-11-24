import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['0d27e503b8fd2d0c2f84178cfe3f95f7.serveo.net', '.serveo.net', 'nasty-pianos-unite.loca.lt'],
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
