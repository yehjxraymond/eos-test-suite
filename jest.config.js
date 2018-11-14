module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/.coverage/",
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ]
};
