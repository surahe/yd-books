const {join} = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  devServer: {
    contentBase: join(__dirname, '../dist'),
    host: "0.0.0.0",
    hot: true,
    quiet: true
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "yd-books",
      suppressSuccess: true
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      }
    })
  ]
}