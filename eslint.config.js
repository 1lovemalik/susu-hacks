import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist'], // Ignore the dist folder
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Target all relevant files
    languageOptions: {
      ecmaVersion: 2020, // Modern ECMAScript
      globals: globals.browser, // Include browser globals
      parser: tsParser, // Use TypeScript parser
    },
    plugins: {
      react, // React plugin
      'react-hooks': reactHooks, // React hooks plugin
      'react-refresh': reactRefresh, // React Refresh plugin
      '@typescript-eslint': tseslint, // TypeScript ESLint plugin
    },
    rules: {
      // JavaScript rules
      ...js.configs.recommended.rules,
      // React rules
      ...react.configs.recommended.rules,
      // React hooks rules
      ...reactHooks.configs.recommended.rules,
      // TypeScript rules
      ...tseslint.configs['recommended'].rules,
      // Custom rules
      '@typescript-eslint/no-unused-vars': ['warn'], // Warn on unused vars in TS
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
