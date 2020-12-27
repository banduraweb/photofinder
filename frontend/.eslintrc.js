module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ["react-app"],
  globals: {},
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "import", "react-hooks","jsx-a11y"],
  ignorePatterns: ["node_modules/"],
  rules: {"react/prop-types": 0, "no-underscore-dangle":  ["error", { "allow": ["_id"] }]},
  settings: {
    react: {
      version: "latest",
    },
  },
};
