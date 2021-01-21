export default {
  clearMocks: true,
  collectCoverageFrom: [
    "src/controllers/**/*.ts"
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "__tests__/coverage",
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json",
    "lcov"
  ],
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "<rootDir>/__tests__/**/*test.ts"
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts$":'ts-jest'
  },
};