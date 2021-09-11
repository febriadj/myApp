const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'client', 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|s[ac]ss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(md|png|jpe?g|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'client', 'build'),
    },
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
}
