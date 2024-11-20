// @ts-check
import eslint from '@eslint/js';
import eslintPluginReact from 'eslint-plugin-react';
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      parserOptions: { 
        projectService: true,
        ecmaFeatures: { jsx: true }
      },
    },
  }, 
  {
    plugins: {
      'react': eslintPluginReact
    }
  }, 
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off"
    }
  }
);