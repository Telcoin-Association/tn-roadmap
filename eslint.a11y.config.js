import baseConfig from './eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/aria-role': 'error'
    }
  }
];
