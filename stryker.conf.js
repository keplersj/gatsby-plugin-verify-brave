// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = function(config) {
  config.set({
    mutate: ["**/*.ts", "!__mocks__/**/*.ts", "!__tests__/**/*.ts"],
    mutator: "typescript",
    reporters: ["clear-text", "progress"],
    testRunner: "jest",
    coverageAnalysis: "off",
    jest: {
      projectType: "custom",
      // Only use the unit test project
      config: require(path.resolve(__dirname, "./jest.config.js")).projects[0],
      enableFindRelatedTests: true
    }
  });
};
