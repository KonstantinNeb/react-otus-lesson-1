module.exports = {
  mode: 'development',

  devServer: {
    hot: true,
    open: true,
    overlay: true,
    historyApiFallback: true,
  },

  devtool: 'source-map',
}
