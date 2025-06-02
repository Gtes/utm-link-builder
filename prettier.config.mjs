/**
 * @type {import('prettier').Config}
 */
export default {
  endOfLine: "lf",
  jsxSingleQuote: false,
  printWidth: 80,
  trailingComma: "all",
  singleQuote: true,
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "react(.*)$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "@myn/(.*)$",
    "",
    "^[./]",
  ],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["cn", "cva"],
};
