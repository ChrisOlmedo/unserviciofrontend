import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'modules': resolve(__dirname, 'src/modules'),
      'components': resolve(__dirname, 'src/shared/components'),
      'hooks': resolve(__dirname, 'src/shared/hooks'),
      'guards': resolve(__dirname, 'src/shared/guards'),
      'constants': resolve(__dirname, 'src/shared/constants'),
      'config': resolve(__dirname, 'src/config'),
      'types': resolve(__dirname, 'src/shared/types/index.ts'),
      'router': resolve(__dirname, 'src/shared/router'),
    },
  },
})
