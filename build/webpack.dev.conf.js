var config = require("../config")
var path = require("path")
var webpack = require("webpack")
var merge = require("webpack-merge")
var webpackBaseConfig = require("./webpack.base.conf")
// html 模板插件
var HtmlWebpackPlugin = require("html-webpack-plugin")
// 更友好的提示插件
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
// 获取一个可用的 port 的插件
var portfinder = require("portfinder")

var devConfig = config.dev;

var webpackDevConfig = merge(webpackBaseConfig, {
  mode: "development",
  devtool: devConfig.devtool,
  devServer: {
    // 当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时。这可能显得很繁琐。
    clientLogLevel: "warning",
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(devConfig.assetsPublicPath, "index.html")
      }]
    },
    // 启用 webpack 的模块热替换特性
    hot: true,
    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
    // 静态文件位置
    // contentBase: false,
    // 一切服务都启用 gzip 压缩
    compress: true,
    host: devConfig.host,
    port: devConfig.port,
    // 是否自动打开浏览器
    open: devConfig.autoOpenBrowser,
    // 是否打开发现错误之后浏览器全屏幕显示错误信息功能
    overlay: devConfig.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    // 此路径下的打包文件可在浏览器中访问。
    // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。默认 publicPath 是 "/"，所以你的包(bundle)可以通过 http://localhost:8080/bundle.js 访问。
    publicPath: devConfig.assetsPublicPath,
    // 启动接口访问代理
    proxy: devConfig.proxyTable,
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    // 和 FriendlyErrorsPlugin 配合食用更佳
    quiet: true,
    // 开启监听文件修改的功能，在 webpack-dev-server 和 webpack-dev-middleware 中是默认开始的
    // watch: true,
    // 关于 watch 的一些选项配置
    watchOptions: {
      // 排除一些文件监听，这有利于提高性能
      // 但是这在应对需要 npm install 一些新的 module 的时候，就需要重启服务
      ignored: /node_modules/,
      // 是否开始轮询，有的时候文件已经更改了但是却没有被监听到，这时候就可以开始轮询
      poll: devConfig.poll
    }
  },
  plugins: [
    // 这可以创建一个 在编译过程中的 全局变量
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = webpackDevConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      webpackDevConfig.devServer.port = port
      webpackDevConfig.plugins.push(new FriendlyErrorsPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: [`your application is running here: http://${webpackDevConfig.devServer.host}:${port}`]
        },
        onErrors: devConfig.notifyOnErrors ? utils.createNotifierCallback() : ""
      }))
    }
  })
  resolve(webpackDevConfig)
})