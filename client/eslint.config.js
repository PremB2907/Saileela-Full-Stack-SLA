import react from 'eslint-plugin-react';

export default [{ ignores: ['dist/**'] }, { files: ['**/*.{js,jsx}'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } }, plugins: { react }, settings: { react: { version: 'detect' } }, rules: { 'no-unused-vars': 'warn', 'react/jsx-uses-vars': 'error', 'react/jsx-uses-react': 'error' } }];
