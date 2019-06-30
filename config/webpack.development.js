const { join } = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  devServer: {
    contentBase: join(__dirname, '../dist'),
    host: "0.0.0.0",
    hot: true,
    quiet: true
  },
  plugins: [
    new CopyPlugin([
      { from: join(__dirname, '../', 'src/web/views/layouts/layout.html'), to: '../views/layouts/layout.html' },
    ]),
    new CopyPlugin([
      { from: join(__dirname, '../', 'src/web/components'), to: '../components' },
    ], {
        ignore: ["*.js", "*.css", ".DS_Store"]
      }),
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