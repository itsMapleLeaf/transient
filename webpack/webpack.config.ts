import * as HTMLPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

const root = path.resolve(__dirname, '..')

const config: webpack.Configuration = {
  entry: path.resolve(root, 'src/main'),
  output: {
    path: path.resolve(root, 'build'),
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
  plugins: [
    new HTMLPlugin({ template: path.resolve(root, 'index.html') }),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: '#source-map',
}

export default config
