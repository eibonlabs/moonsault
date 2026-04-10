import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([{
  files: ["**/*.{js,mjs,cjs}"],
  plugins: {
    js
  },
  extends: ["js/recommended"],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      moonsault: "readonly",
      quit: "readonly"
    },
  }
}]);
