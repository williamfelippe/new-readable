const webpack = require('webpack')
const { merge } = require('webpack-merge')

const paths = require('./paths.js')
const common = require('./webpack.config.js')

const config = merge(common, {
  mode: 'development',
  devServer: {
    port: 8000,
    open: false,
    compress: true,
    firewall: false,
    historyApiFallback: true,
    static: {
      directory: paths.BUILD,
      publicPath: paths.PUBLIC,
      watch: true
    }
  }
})

module.exports = config
