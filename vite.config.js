import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5001, // Altere para a porta desejada
  },
  base: '/', // Certifique-se de que está configurado corretamente para o ambiente de produção

})
