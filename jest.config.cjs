/** @type {import('jest').Config} */
const config = {
  rootDir: "src",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};

module.exports = config;
