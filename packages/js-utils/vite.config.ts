/// <reference types="vitest" />
import baseConfig from '../../vite.config';
import { mergeConfig, defineConfig } from 'vite';
import { resolve } from 'path';

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      lib: {
        entry: {
          main: resolve(__dirname, 'src/main.ts'),
        },
        name: '@spuxx/js-utils',
        formats: ['es'],
      },
    },
  }),
);
