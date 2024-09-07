const js = require("@eslint/js");
const FlatCompat = require("@eslint/eslintrc");
const compat = new FlatCompat.FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ...compat.extends("react-app"),
  },
];
