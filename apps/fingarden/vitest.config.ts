import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    alias: {
      '@/domain': path.resolve(__dirname, './src/app/domain'),
      '@/contexts': path.resolve(__dirname, './src/app/contexts'),
      '@/hooks': path.resolve(__dirname, './src/app/hooks'),
      '@/utils': path.resolve(__dirname, './src/app/utils'),
    },
  },
})
