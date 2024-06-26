/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: [
        "tests/cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
        "tests/cypress/component/**/*.{cy,spec}.{js,ts,jsx,tsx}",
        "tests/cypress/support/**/*.{js,ts,jsx,tsx}",
      ],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "error",
    "no-alert": "error",
    "no-debugger": "error",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
