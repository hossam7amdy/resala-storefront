// @ts-check
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { defineConfig } from '@eslint/config-helpers'
import eslintConfigPrettier from 'eslint-config-prettier'

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 * @type {import("eslint").Linter.Config[]}
 * */
export default defineConfig(
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: ['**/dist/**', '**/.medusa/**', '**/.next/**'],
  }
)
