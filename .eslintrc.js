module.exports = {
   "parser": "@babel/eslint-parser",
   env: {
      browser: true,
      es6: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'react-app'
    ],
    plugins: [
      'react',
      'jsx-a11y',
      'import',
    ],
    rules: {
    },
  };
  