const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
          ignoredDependencies: [
            'tslib',
            '@eslint/eslintrc',
            '@eslint/js',
            '@ng-icons/feather-icons',
            'jest-preset-angular',
            '@angular/platform-browser',
            '@angular/router',
            '@analogjs/vitest-angular',
            '@angular/compiler',
            '@analogjs/vite-plugin-angular',
            '@nx/vite',
            'vite',
            'vitest',
          ],
        },
      ],
    },
    languageOptions: { parser: require('jsonc-eslint-parser') },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ng',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ng',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/component-class-suffix': 'off',
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
];
