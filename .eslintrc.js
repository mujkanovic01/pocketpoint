module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-misused-promises': 'off',
    curly: 'off',
    'no-console': 'warn',
    'no-empty': ['error', {allowEmptyCatch: true}],
    '@typescript-eslint/no-namespace': 'off',
    'object-curly-spacing': ['error', 'always'],
    'prettier/prettier': 'error',
    'import/no-named-as-default-member': 'off',
  },
};
