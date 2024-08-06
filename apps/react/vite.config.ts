/// <reference types="vitest" />
import baseConfig from '../../vite.config';
import { mergeConfig, defineConfig } from 'vite';

export default mergeConfig(baseConfig, defineConfig({}));
