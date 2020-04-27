const testPathIgnorePatterns = [
  "/node_modules/",
  "/gatsby-node.js",
  "/gatsby-node.js.map",
  "/gatsby-node.d.ts",
  "/gatsby-node.d.ts.map",
  "/index.js",
  "/index.js.map",
  "/index.d.ts",
  "/index.d.ts.map",
  "/coverage/",
];

module.exports = {
  collectCoverage: true,
  projects: [
    {
      displayName: "test",
      preset: "ts-jest",
      collectCoverage: true,
    },
    {
      displayName: "lint:prettier",
      preset: "jest-runner-prettier",
      testPathIgnorePatterns,
    },
    {
      runner: "eslint",
      displayName: "lint:eslint",
      testMatch: [
        "<rootDir>/**/*.ts",
        "<rootDir>/**/*.tsx",
        "<rootDir>/**/*.js",
      ],
      testPathIgnorePatterns,
    },
  ],
};
