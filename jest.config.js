const { createJsWithTsPreset } = require("ts-jest");

const defaultPreset = createJsWithTsPreset();

/** @type {import('jest').Config} */
const config = {
  rootDir: "src",
  ...defaultPreset,
};

module.exports = config;
