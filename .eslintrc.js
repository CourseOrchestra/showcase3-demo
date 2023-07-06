module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
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
