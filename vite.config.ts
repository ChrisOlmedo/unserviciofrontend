import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'modules': resolve(__dirname, 'src/modules'),
      'components': resolve(__dirname, 'src/components'),
      'hooks': resolve(__dirname, 'src/hooks'),
      'guards': resolve(__dirname, 'src/guards'),
      'constants': resolve(__dirname, 'src/constants'),
      'config': resolve(__dirname, 'src/config'),
      'types': resolve(__dirname, 'src/types/index.ts'),
    },
  },
})
