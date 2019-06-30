const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlAfterPlugin = require('./config/htmlAfterPlugin')
const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')

const _mode = argv.mode || 'development'
const _module = argv.modules || 'nomodule'

const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const _mergeModuleConfig = require(`./config/webpack.${_module}.js`)

const webpackConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      template: _module === 'nomodule' ? `src/index.html` : 'dist/index.html',
      filename: `index.html`
    }),
    new HtmlAfterPlugin({
      isHack: false
    })
  ]
}

module.exports = merge(webpackConfig, _mergeModuleConfig, _mergeConfig)