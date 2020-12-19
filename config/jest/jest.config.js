module.exports = {
  "rootDir": "../../",
  "verbose": true,
  "preset": "ts-jest/presets/js-with-ts",
  "setupFilesAfterEnv": [
    "<rootDir>/config/jest/setupTestingLibrary.js"
  ],
  "testMatch": [
    "<rootDir>/src/**/?(*.)(spec|test).ts?(x)",
  ],
  "moduleDirectories": [
    "node_modules"
  ],
  "moduleFileExtensions": [
    "js",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  "moduleNameMapper": {
    '^.+\\.(css|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|svg|pdf)$': '<rootDir>/config/jest/file-mock.js',

    '^common/(.*)': '<rootDir>/src/common/$1',
    '^modules/(.*)': '<rootDir>/src/modules/$1',
    '^views/(.*)': '<rootDir>/src/views/$1'
  },
  "globals": {
    "ts-jest": {
      "tsconfig": '<rootDir>/tsconfig.test.json',
      "diagnostics": {
        "warnOnly": true
      }
    }
  },
  "coverageThreshold": {
    "global": {
      "statements": 74,
      "branches": 41,
      "functions": 47,
      "lines": 76
    }
  }
}
