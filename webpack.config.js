const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(mp3|ogg|flac|png|svg)$/,
        loader: 'file-loader',
        options: { name: '[name].[md5:hash:hex:8].[ext]' },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devServer: {
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  plugins: [new HTMLPlugin({ template: './src/index.html' })],
  devtool: '#source-map',
}
