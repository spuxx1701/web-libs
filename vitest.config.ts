/// <reference types="vitest" />
import baseConfig from './vite.config';
import { mergeConfig, defineConfig } from 'vite';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      setupFiles: ['tests/vitest/vitest.setup.ts'],
      reporters: ['default', 'junit'],
      outputFile: 'reports/junit/junit.xml',
      coverage: {
        provider: 'v8',
        all: true,
        include: ['packages/**/src/**/*.ts'],
        exclude: ['**/src/main.ts', '**/*types.ts'],
        reportsDirectory: 'reports/vitest/coverage',
        reporter: ['text', 'cobertura'],
      },
    },
  }),
);
