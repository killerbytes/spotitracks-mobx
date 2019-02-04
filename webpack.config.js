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
      },
      {
        test: /\.eot(.*)$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(.*)$/,
        loader: 'file-loader',
      },
      {
        test: /\.ttf(.*)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'src', './', 'images'],
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, './dist'),
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
