const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlAfterPlugin = require('./config/htmlAfterPlugin')
const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')
const {join} = require('path')
const glob = require('glob')

const _mode = argv.mode || 'development'
const _modeFlag = _mode === 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const files = glob.sync('./src/web/views/**/*.entry.js') // 寻找入口

let _entry = {}
let _plugins = []

for (let item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) === true) {
    const entryKey = RegExp.$1
    const [dist, template] = entryKey.split('-')

    _entry[entryKey] = item
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`,
        template: `src/web/views/${dist}/pages/${template}.html`,
        inject: false, //不注入js
        chunks: [entryKey] // 核心
      }),
    )
  }
}

const webpackConfig = {
  entry: _entry,
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          // 'style-loader',
          {loader: MiniCssExtractPlugin.loader},
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    ..._plugins,
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new HtmlAfterPlugin()
  ],
  watch: _modeFlag
}

module.exports = merge(webpackConfig, _mergeConfig)