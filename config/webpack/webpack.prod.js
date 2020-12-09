const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const common = require('./webpack.config.js')

const config = merge(common, {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new TerserPlugin({ parallel: true }),
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})

module.exports = config
