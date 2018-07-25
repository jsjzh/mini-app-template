var utils = require("./utils")
// 更友好的提示插件
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
// 获取一个可用的 port 的插件
var portfinder = require("portfinder")
var devWebpackConfig = require("./webpack.dev.conf");
var baseWebpackConfig = require("./webpack.base.conf");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

var path = require("path");
var fs = require("fs");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var pagesInfo = require("../config/page");
var pages = pagesInfo.pages;

function resolve(fileName) {
  return path.resolve(__dirname, "../", fileName)
}

function fileIsExist(file) {
  fs.readFile(file, (err) => {
    return err ? false : true;
  })
}

function getCommonJsPath(fileName) {
  return resolve(`src/common/js/${fileName}.js`);
}

function getPageHtmlPath(fileName) {
  return resolve(`src/pages/${fileName}/index.html`);
}

let _entry = {};
let _htmlPlugin = [];

pages.forEach((item) => {
  let _entryJs = [resolve(`${item.path}/index.js`)];
  item.commonJs.reverse().forEach((elem) => {
    if (elem) _entryJs.unshift(getCommonJsPath(elem));
  })
  _entry[item.name] = ["babel-polyfill"].concat(_entryJs);
  _htmlPlugin.push(new HtmlWebpackPlugin({
    title: item.title,
    filename: `${item.name}/index.html`,
    template: getPageHtmlPath(item.name),
    inject: true,
    chunks: [item.name],
  }))
});

// 导出一个 promise 函数，这可以让 wepback 接受一个异步加载的配置
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8080
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      // devWebpackConfig.devServer.port = port
      baseWebpackConfig.entry = _entry
      baseWebpackConfig.mode = "development"
      baseWebpackConfig.plugins.push(new VueLoaderPlugin())
      baseWebpackConfig.plugins.push(new MiniCssExtractPlugin({
        filename: '[name]/index.css'
      }))
      baseWebpackConfig.plugins.push(new OptimizeCSSAssetsPlugin())
      baseWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: [`开发环境启动成功，项目运行在: http://localhost:${port}`]
        },
        onErrors: utils.createNotifierCallback()
      }))
      _htmlPlugin.forEach(item => {
        baseWebpackConfig.plugins.push(item)
      })
      resolve(baseWebpackConfig)
    }
  })
})