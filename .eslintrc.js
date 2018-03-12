module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'strict': ['error', 'global'],

    'default-case': 'error',
    'no-self-compare': 'error',
    'no-else-return': 'error',
    'no-throw-literal': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-void': 'error',
    'no-var': 'error',
    'no-new-require': 'error',
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 2 }],
    'no-unused-vars': ['error', {'args': 'all', 'argsIgnorePattern': '^_'}],
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'prefer-const': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    // testcafe
    test: true,
    fixture: true,
    // jquery(by cdn)
    $: true,
    // skyway-js-sdk(by cdn)
    Peer: true,
    // ./src/shared/util.js
    Util: true,
  }
};
