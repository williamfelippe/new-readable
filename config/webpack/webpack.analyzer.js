const { merge } = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const prodConfig = require('./webpack.prod')

const config = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})

module.exports = config
