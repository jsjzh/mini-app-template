// require('./check-versions')()
process.env.NODE_ENV = 'development'

var config = require('../config');
var utils = require('./utils');
var webpackConfig = require('./webpack.dev.conf');

// 该插件可以在浏览器中打开一个网址
var opn = require('opn');
// 由于是用于 dev 的环境，所以对于性能以及 diy 性要求不高，遂和 vue-cli 一样直接使用大而全的 express 搭建
var express = require('express');
// 该处就类似于 webpack 官网中的命令行输入 webpack 一样
var webpack = require('webpack');
// webpack-dev-middleware 中间件
// 可以用作 express 的中间件 该中间件可以使编译后的代码运行在内存中而不是打包到硬盘上
// 和其他教程中使用的 webpack-dev-sever 有所不同
// webpack-dev-server 是直接包装了一个服务器（可以看做是我们项目里的 express）和热更新插件，并且可以直接使用
// https://webpack.docschina.org/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-server
var webpackDevMiddlerware = require('webpack-dev-middleware');
// HMR 是 webpack 提供的最有用的功能之一 --- 摘自官网
// 如果我们使用的是 webpack-dev-server 那就不用再使用 webpack-hot-middleware 了
// 因为上面我用了 webpack-dev-middleware 的中间件 所以这里还需要进行 webpack-hot-middleware 的配置
// 在许多文章中都看到 module.hot.accept 的写法
// https://webpack.docschina.org/api/hot-module-replacement
// 但如果你使用了 vue-loader 它会针对 vue 项目提供开箱即用的效果，意思就是自己用再写 module.hot-accept 了
// 想要深入了解的人可以去看看 vue-hot-reload-api 插件，源码里面就使用了该方法，该插件在 vue-loader 插件中使用
// 包括样式的无刷新更新 这个是 style-loader 提供的功能
// TODO 热编译和热更新和刷新浏览器
var webpackHotMiddlerware = require('webpack-hot-middleware');

var port = config.dev.port;
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
// 这里没有直接使用 localhost 作为访问地址
// 而是使用了局域网 ip
// 如果和其他同事处于相同的局域网，他就可以直接访问你的服务地址而实时看到你做的修改
var ip = utils.getIPAdress();

var app = express();
// 这里就是相当与命令行执行了 webpack --config webpack.config.js
// 采用文件的形式执行不仅可以方便使用中间件而且也更加直观
var compiler = webpack(webpackConfig)

// 配置 webpack-dev-middleware 中间件
// https://segmentfault.com/a/1190000011761306
var devMiddleware = webpackDevMiddlerware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
// 配置 webpack-hot-middleware 中间件
// https://segmentfault.com/a/1190000011761345
var hotMiddleware = webpackHotMiddlerware(compiler, {
  log: false,
  heartbeat: 2000
})

// TODO
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// TODO
// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

// 将中间件分别装载
app.use(hotMiddleware)
app.use(devMiddleware)
// 设置搭建的 web 服务器可以访问的静态文件的地址
// 相关文档应该参考 express
// http://www.expressjs.com.cn/starter/static-files.html
app.use(express.static("static"));
// 在 compiler 之后执行监听端口和打开浏览器的操作
devMiddleware.waitUntilValid(() => {
  if (autoOpenBrowser) opn(`http://${ip}:${port}`)
  app.listen(port, ip)
})