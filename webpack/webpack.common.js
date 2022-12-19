const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'app.[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React.js OTUS course',
      template: './src/index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
  },
}
