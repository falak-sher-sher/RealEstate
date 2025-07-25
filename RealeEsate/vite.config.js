import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/Backend':{
        target:'http://localhost:3000',
        changeOrigin:true,
        secure:false,
        
      },
    },
  },
  plugins: [react(),tailwindcss({
    config:{
      content:['./src/**/*.{js,jsx,ts,tsx}'],
    }
  }),],
})
