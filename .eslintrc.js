module.exports = {
   "parser": "@babel/eslint-parser",
   env: {
      browser: true,
      es6: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    plugins: [
      'react',
      'jsx-a11y',
      'import',
    ],
    rules: {
      "react/prop-types": "off"
    },
  };
  