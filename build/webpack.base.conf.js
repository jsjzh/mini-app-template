var utils = require("./utils")
var config = require("../config")

module.exports = {
  // webpack 处理打包文件的时候的初始目录
  // utils.resolve 其实就是对 nodeJs 的 path 模块的包装
  // 因为文件都是在 build 目录下
  // 因为很多地方都要得到项目的初始目录
  // 就包装了一下 path.resolve(__dirname, "../", file)
  context: utils.resolve("./"),
  // 入口文件，webapck 4.x 默认的就是这儿
  // 其实对于需要使用 ES6 语法转换的场景，这里还会需要一个 babel-polyfill
  // 这个是对于一些 ES6 的函数的声明，和 babel-preset-env 进行的语法转义不同
  // 比如 Array.from 这个在就是 ES6 新函数，是 babel-polyfill 做的事儿
  // 而 () => {} 或者 let { name, age } = obj; 这就是 babel-preset-env 做的事情
  entry: {
    app: ["babel-polyfill", "./src/index.js"]
  },
  // 输出文件的目录
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: process.env.NODE_ENV === "production" ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
    }]
  }
}