/// <reference types="vitest" />
import baseConfig from '../../vite.config';
import { mergeConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [...baseConfig.plugins!, ViteYaml(), react()],
  }),
);
