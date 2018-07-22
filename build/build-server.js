var utils = require("./utils")

// 更友好的提示插件
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
// 获取一个可用的 port 的插件
var portfinder = require("portfinder")

var devWebpackConfig = require("./webpack.dev.conf");

console.log(devWebpackConfig);

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devWebpackConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: [`your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: utils.createNotifierCallback()
      }))
      resolve(devWebpackConfig)
    }
  })
})