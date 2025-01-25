import tseslint from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { parser } from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: parser,
      globals: {
        ...globals.browser,
        module: true,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier: eslintPluginPrettier,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "react/display-name": "off",
      "@typescript-eslint/no-require-imports": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "object",
            "type",
            "index",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
            },
            {
              pattern: "**/*.{js,jsx,ts,tsx}",
              group: "internal",
            },
            {
              pattern: "**/*.{css}",
              group: "index",
            },
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-empty": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
