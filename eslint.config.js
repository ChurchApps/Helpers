const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");

module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "prefer-const": "error",
      "no-console": "warn",
      "comma-dangle": ["error", "never"],
      "object-curly-newline": ["error", { "multiline": true, "consistent": true }],
      "array-bracket-newline": ["error", "consistent"]
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];