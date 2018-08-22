var utils = require("./utils")
// 更友好的提示插件
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
// 获取一个可用的 port 的插件
var portfinder = require("portfinder")
var devWebpackConfig = require("./webpack.dev.conf");

// 导出一个 promise 函数，这可以让 wepback 接受一个异步加载的配置
// 并在 resolve 的时候运行 这个配置
// 比如这里我就用到了 portfinder 和 friendly-errors-webpack-plugin
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devWebpackConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: [`开发环境启动成功，项目运行在: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: utils.createNotifierCallback()
      }))
      resolve(devWebpackConfig)
    }
  })
})