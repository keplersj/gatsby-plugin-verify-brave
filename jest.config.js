module.exports = {
  projects: [
    {
      displayName: "lint:prettier",
      preset: "jest-runner-prettier",
      testPathIgnorePatterns: [
        "/node_modules/",
        "/gatsby-node.js",
        "/gatsby-node.js.map",
        "/gatsby-node.d.ts",
        "/gatsby-node.d.ts.map",
        "/index.js",
        "/index.js.map",
        "/index.d.ts",
        "/index.d.ts.map",
        "/coverage/"
      ]
    }
  ]
};
