import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'app/public',
  plugins: [
    dts({
      include: ['src/**/*'],
      exclude: ['*.{test,spec}.*'],
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
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
});
