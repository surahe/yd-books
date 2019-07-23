const gulp = require('gulp')
const babel = require('gulp-babel')
const watch = require('gulp-watch')
const rollup = require('gulp-rollup')
const replace = require('rollup-plugin-replace')

const entry = './src/server/**/*.js'
const clearEntry = ['./src/server/config/index.js']

function buildDev() {
  return watch(entry, { ignoreInitial: false }, function () {
    gulp.src(entry)
      .pipe(babel({
        babelrc: false, // 停止查找babel配置文件
        "plugins": [
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          "@babel/plugin-transform-modules-commonjs"
        ]
      }))
      .pipe(gulp.dest('dist'));
  })
}

function buildProd() {
  return gulp.src(entry)
    .pipe(babel({
      babelrc: false, // 停止查找babel配置文件
      ignore: clearEntry,
      "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "@babel/plugin-transform-modules-commonjs"
      ]
    }))
    .pipe(gulp.dest('dist'));
}

function buildConfig() {
  return gulp.src(entry)
    .pipe(rollup({
      input: clearEntry,
      output: {
        format: 'cjs'
      },
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
    }))
    .pipe(gulp.dest('./dist'))
}

function lint() {
}

let build = gulp.series(buildDev)

if (process.env.NODE_ENV === 'production') {
  build = gulp.series(buildProd, buildConfig)
}

if (process.env.NODE_ENV === 'lint') {
  build = gulp.series(lint)
}

gulp.task('default', build)