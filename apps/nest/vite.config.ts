/// <reference types="vitest" />
import baseConfig from '../../vite.config';
import { mergeConfig, defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      ...baseConfig.plugins!,
      VitePluginNode({
        adapter: 'nest',
        appPath: './src/main.ts',
      }),
    ],
  }),
);
