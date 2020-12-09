const path = require('path');

const resolve = (pathName) => path.resolve(__dirname, pathName)

module.exports = {
  // SRC
  COMMON: resolve('../../src/common'),
  MODULES: resolve('../../src/modules'),
  VIEWS: resolve('../../src/views'),

  // MAIN
  ROOT: resolve('../../'),
  SRC: resolve('../../src'),
  PUBLIC: resolve('../../public'),
  BUILD: resolve('../../build')
};
