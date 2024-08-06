const { parserOptions } = require('./test-apps/nest/.eslintrc');

module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    // Miscellanous
    'no-console': ['error'],
    'no-debugger': ['error'],
    /**
     * Naming convention for variables, functions, methods, classes, interfaces,
     */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE'],
      },
      { selector: 'property', format: ['camelCase'], leadingUnderscore: 'allow' },
      { selector: 'property', modifiers: ['requiresQuotes'], format: null },
      { selector: 'method', format: ['camelCase'], leadingUnderscore: 'allow' },
      { selector: 'function', format: ['camelCase', 'PascalCase'] },
      { selector: ['typeLike', 'enumMember'], format: ['PascalCase'] },
      {
        selector: 'objectLiteralProperty',
        format: null,
        filter: {
          regex: '^(__html|_html)$',
          match: true,
        },
      },
    ],
  },
};
