const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('//localhost:8000/api'),
    }),
  ],
})
