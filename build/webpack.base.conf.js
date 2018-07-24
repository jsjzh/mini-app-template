var utils = require("./utils")
var config = require("../config")
var path = require("path")

module.exports = {
  // webpack 处理打包文件的时候的初始目录
  // utils.resolve 其实就是对 nodeJs 的 path 模块的包装
  // 因为文件都是在 build 目录下
  // 因为很多地方都要得到项目的初始目录
  // 就包装了一下 path.resolve(__dirname, "../", file)
  context: utils.resolve("./"),
  // 入口文件，webapck 4.x 默认的就是这儿
  entry: {},
  resolve: {
    // extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      // '@': resolve('src'),
      // 'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets')
    }
  },
  // 输出文件的目录
  output: {
    path: config.build.assetsRoot,
    filename: "[name]/index.js",
    publicPath: process.env.NODE_ENV === "production" ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  // 根据语法生成 AST 树，用于描述当前的语句，方便 babel 进行转换
  // babel-core
  // webpack 的 babel-loader 插件
  // babel-loader
  // .babelirc 中配置
  // babel-preset-env
  // babel 所需要转换的语法支持
  // babel-preset-stage-2
  // 包含了很多 ES6 的语法
  // babel-polyfill
  module: {
    rules: [{
        test: /\.js$/,
        loader: "babel-loader",
        include: [utils.resolve('src'), utils.resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
        }, {
          loader: "postcss-loader"
        }]
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
  },
  plugins: []
}