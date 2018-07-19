'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
const manifest = require('../vendor-manifest.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: 'src/main.js'
    // app: ['babel-polyfill', './src/main.js'] // 引入babel-polyfill解决IE不识别ES6语法
  },
  externals: {
    'BMap': 'BMap',
    'echarts': 'echarts',
    'lodash': '_',
    'moment': 'moment',
    'axios': 'axios',
    'Rx': 'Rx',
    'xlsx': 'XLSX',
    'jsPDF': 'jsPDF',
    'html2canvas': 'html2canvas',
    'video.js': 'videojs'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'jquery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DllReferencePlugin({
      manifest
    })
  ],
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('static/js')]
        // include: [resolve('src'), resolve('test'), resolve('node_modules/.2.7.3@iview/src'), resolve('static/js')] // 解决ivew和js目录下的ES6语法兼容性问题
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
