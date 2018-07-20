const utils = require("./utils")
const config = require("../config")

module.exports = {
  // webpack 处理打包文件的时候的初始目录
  context: utils.resolve("./"),
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: process.env.NODE_ENV === "production" ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  }
}