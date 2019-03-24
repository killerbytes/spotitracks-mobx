const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

var path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.woff2?(.*)$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.eot(.*)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.ttf(.*)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.svg(.*)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.mp4(.*)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'src', './', 'assets'],
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: '#inline-source-map',
  devServer: {
    contentBase: `${__dirname}/`,
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new CleanWebpackPlugin([`${__dirname}/build`]),
    new HtmlWebpackPlugin({ template: `${__dirname}/index.html` }),
    new WorkboxPlugin.GenerateSW(),
    new webpack.DefinePlugin({
      CLIENT_ID: JSON.stringify('96026fe448c146698831b9e0c28c9414'),
      SCOPE: JSON.stringify(
        'playlist-modify-private playlist-modify-public playlist-read-private user-read-private user-read-email user-top-read'
      ),
      AUTHORIZE_URL: JSON.stringify('https://accounts.spotify.com/authorize'),
      API_URL: JSON.stringify('https://api.spotify.com/v1'),
      CHART_URL: JSON.stringify('https://spoticharts.herokuapp.com'),
      APP_NAME: JSON.stringify('SPOTITRACKS'),
    }),
  ],
}
