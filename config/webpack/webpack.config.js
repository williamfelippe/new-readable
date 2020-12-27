const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const paths = require('./paths.js')

const getTSConfigFile = () => {
  const tsConfigFile = (process.env.NODE_ENV === 'production')
    ? 'tsconfig.json'
    : 'tsconfig.dev.json'

  return tsConfigFile
}

const config = {
  entry: path.resolve(path.join(paths.SRC, '/index.tsx')),
  output: {
    publicPath: '/',
    path: paths.BUILD,
    filename: '[name].[fullhash].js',
    chunkFilename: '[chunkhash].bundle.js'
  },
  module: {
    rules: [

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: getTSConfigFile()
        }
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },

      {
        test: /\.(s*)css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      isProd: process.env.NODE_ENV === 'production',
      inject: true,
      filename: 'index.html',
      template: path.join(paths.PUBLIC, '/index.html'),
      favicon: path.join(paths.PUBLIC, '/favicon.ico')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      "common": paths.COMMON,
      "modules": paths.MODULES,
      "views": paths.VIEWS
    }
  }
}

module.exports = config
