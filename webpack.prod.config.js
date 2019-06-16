const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = merge(config, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify('production'),
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJsPlugin(),
    new WorkboxPlugin.GenerateSW({ skipWaiting: true }),
  ],
})
