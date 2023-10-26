module.exports = {
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    testPathIgnorePatterns: ["/node_modules/"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
      "^.+\\.svg$": "<rootDir>/fileTransform.js", // Adicione esta linha
    },
    moduleFileExtensions: ["js", "json", "jsx", "node", "svg"], // Adicione "svg" aqui
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.(css|less|scss)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
  };
  