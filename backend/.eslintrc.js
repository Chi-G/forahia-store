module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'commonjs',
  },
  rules: {
    // Allow require() statements in Node.js
    '@typescript-eslint/no-var-requires': 'off',
    // Allow console.log in backend
    'no-console': 'off',
    // Allow unused vars for error handling middleware
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^(req|res|next|err)$' }],
  },
};
