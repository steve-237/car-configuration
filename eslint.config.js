// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: ["**/main.ts", "**/*.test.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "no-var": "off",
      "@angular-eslint/no-output-on-prefix" : "off",
      "@angular-eslint/component-class-suffix": "off",
      "prefer-const": "off",
      "@angular-eslint/no-empty-lifecycle-method" : "off",
      "@angular-eslint/use-lifecycle-interface": "off",
      "@angular-eslint/no-inputs-metadata-property" : "off",
      "@angular-eslint/no-outputs-metadata-property": "off",
      "@angular-eslint/no-input-rename": "off",
      "@angular-eslint/no-output-rename": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@angular-eslint/no-output-native": "off"
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended
    ],
    rules: {
      "@angular-eslint/template/alt-text": "off"
    },
  }
);
