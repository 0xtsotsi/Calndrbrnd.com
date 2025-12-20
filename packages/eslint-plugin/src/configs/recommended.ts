const recommended = {
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  rules: {
    "@calndrbrnd/eslint/deprecated-imports": "error",
    "@calndrbrnd/eslint/deprecated-imports-next-router": "error",
    "@calndrbrnd/eslint/avoid-web-storage": "error",
    "@calndrbrnd/eslint/avoid-prisma-client-import-for-enums": "error",
    "@calndrbrnd/eslint/no-prisma-include-true": "warn",
    "@calndrbrnd/eslint/no-scroll-into-view-embed": "error",
    "@calndrbrnd/eslint/no-direct-prisma-import": "error",
    "@calndrbrnd/eslint/no-this-in-static-method": "error",
  },
};

export default recommended;
