const { FlatCompat } = require('@eslint/eslintrc');
const baseConfig = require('../../eslint.config.js');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...baseConfig,
  ...compat
    .config({
      extends: [
        'plugin:@nx/angular',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
    })
    .map(config => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        '@angular-eslint/no-host-metadata-property': 'off',
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
    })),
  ...compat
    .config({ extends: ['plugin:@nx/angular-template'] })
    .map(config => ({
      ...config,
      files: ['**/*.html'],
      rules: {},
    })),
  ...compat.config({ parser: 'jsonc-eslint-parser' }).map(config => ({
    ...config,
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: [
            'tslib',
            '@eslint/eslintrc',
            '@eslint/js',
            '@ng-icons/feather-icons',
            'jest-preset-angular',
            '@angular/platform-browser',
            '@angular/router',
          ],
        },
      ],
    },
  })),
];
