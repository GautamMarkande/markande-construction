module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true // ✅ Ensures Node.js globals like "module" are recognized
  },
  extends: [
    'eslint:recommended', // ✅ Enables core linting rules (e.g., `no-undef`)
    'plugin:react/recommended', 
    'plugin:react/jsx-runtime', 
    'plugin:react-hooks/recommended',
    'plugin:import/errors', // ✅ Detects missing imports (functions/variables)
    'plugin:import/warnings'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module' 
  },
  settings: { 
    react: { version: 'detect' } // ✅ Auto-detect React version
  },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-undef': 'error', // ✅ NOW detects undefined variables
    'no-unused-vars': 'warn', // ✅ Warns about unused variables
    'import/no-unresolved': 'error', // ✅ Detects missing imports
  },
};
