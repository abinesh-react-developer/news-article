const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest", 
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(next|react|react-dom)/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", 
  },
};

module.exports = createJestConfig(customJestConfig);
