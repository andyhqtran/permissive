const path = require('path');

module.exports = {
  entry: {
    bookmark: './src/bookmark.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './assets'),
  },
  resolve: {
    alias: {
      react: 'preact',
      'react-dom': 'preact',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
