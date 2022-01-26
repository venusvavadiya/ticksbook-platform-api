module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'dist',
    'node_modules',
  ],
  rules: {
    '@typescript-eslint/lines-between-class-members': ['error', 'always', {
      'exceptAfterSingleLine': true,
    }],
    'class-methods-use-this': ['error', { 'exceptMethods': [
      'getStreamNamePrefixes',
    ]}],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
  },
};
