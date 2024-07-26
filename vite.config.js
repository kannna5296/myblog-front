import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; //これがないと.vueファイルを読んでくれないらしい
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
