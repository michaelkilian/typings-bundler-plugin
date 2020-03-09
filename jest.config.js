const path = require('path');

module.exports = {
  modulePathIgnorePatterns : [
    '<rootDir>/node_modules/'
  ],
  roots: [
    '<rootDir>/tests'
  ],
  preset: 'ts-jest',
  rootDir: path.resolve(__dirname),
  verbose: true,
  collectCoverage: true
}
