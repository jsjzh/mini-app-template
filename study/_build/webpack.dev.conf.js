// 这里是去读取在 config 中的配置文件
var config = require("../config");
// 然后把配置文件的配置放到一个比较短的变量里面 对 能偷懒绝不站着
var devConfig = config.dev;
// 一些自己写的工具函数，里面有个比较有用的函数
// utils.getIPAdress
// 这个可以获取你的电脑的 ip 地址，然后开发服务器就可以搭建在局域网里
// 如果有一同开发的小伙伴，在同一局域网内就可以直接访问地址看到你的页面
// 同样，这个也适用于手机，连上同一个 wifi 之后就可以在手机上实时看到修改的效果
var utils = require("./utils");
// nodeJs 内置的函数，专门用来解析路径啥的
var path = require("path");
// 大名鼎鼎的 webpack
var webpack = require("webpack");
// webpack-merge 插件，可以把 webpack 的配置进行 merge
// 这里就用他 merge 了 base 和 dev 配置
var merge = require("webpack-merge");
// html-webpack-plugin 这个插件一定不陌生
// 他可以生成 html 文件，并把 webpack 打包好的 bundle 插入到 html 文件中
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 这个是在用 webpack 打包时，dev 和 prod 环境都适用的基础配置
var webpackBaseConfig = require("./webpack.base.conf");

module.exports = merge(webpackBaseConfig, {
  // webpack 4.x 新的东东，详细的可以在 readme.md 中查看
  mode: "development",
  // 一句话，这是个方便开发工具进行代码定位的配置
  // 但是不同的配置会影响编译速度和打包速度，我这里使用了和 vue-cli 同样的配置
  devtool: devConfig.devtool,
  // 使用了 webpack-dev-server 之后就需要有的配置
  // 在这里可以配置详细的开发环境
  devServer: {
    // 当我们在 package.json 中使用 webpack-dev-server --inline 模式的时候
    // 我们在 chrome 的开发工具的控制台 console 可以看到信息种类
    // 可选 none error warning info
    clientLogLevel: "warning",
    // Not to worry: To fix the issue, all you need to do is add a simple catch-all fallback route to your server. If the URL doesn't match any static assets, it should serve the same index.html page that your app lives in. Beautiful, again!
    // 这个配置就是应用了 connect-history-api-fallback 插件
    // 想象一个场景，vue 开发，我们利用 vue-router 的 history 模式进行单页面中的页面跳转
    // www.demo.com 跳转去 www.demo.com/list
    // 看起来没毛病，vue-router 中只要配置了 list 的路由即可
    // 但是，当你刷新页面的时候，浏览器会去向服务器请求 www.demo.com/list 的资源，这想当然是找不到的
    // 这个中间件就是会自动捕获这个错误，然后将它重新定位到 index.html
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(devConfig.assetsPublicPath, "index.html")
      }]
    },
    // webpack 最有用的功能之一，热更新装填启动
    hot: true,
    // 告诉 webpack-dev-server 搭建服务器的时候从哪里获取静态文件
    // 默认情况下，将使用当前工作目录作为提供静态文件的目录
    // contentBase: false,
    // 搭建的开发服务器启动 gzip 压缩
    compress: true,
    // 搭建的开发服务器的 host，这里使用了一个函数去获取当前电脑的局域网 ip
    host: utils.getIPAdress(),
    // 开发服务器的端口号
    // 但是后面我们会用到 portfinder 插件，如果真的 config/index.js 中的端口被占用了
    // 那这个插件会以这个为 base port 去找一个没有被占用的 port
    port: devConfig.port,
    // 是否要服务器搭建完成之后自动打开浏览器
    // 在 webpack-dev-server 的源码里面就是直接用了 opn 这个插件实现功能
    open: devConfig.autoOpenBrowser,
    // 是否打开发现错误之后在浏览器全屏幕显示错误信息功能
    overlay: devConfig.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    // 此路径下的打包文件可在浏览器中访问
    // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js
    // 默认 publicPath 是 "/"，所以 bundle.js 可以通过 http://localhost:8080/bundle.js 访问
    publicPath: devConfig.assetsPublicPath,
    // 启动接口访问代理
    proxy: devConfig.proxyTable,
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    // 和 FriendlyErrorsPlugin 配合食用更佳
    quiet: true,
    // 开启监听文件修改的功能，在 webpack-dev-server 和 webpack-dev-middleware 中是默认开始的
    // watch: true,
    // 关于上面 watch 的一些选项配置
    watchOptions: {
      // 排除一些文件监听，这有利于提高性能
      // 这里排除了 node_modules 文件夹的监听
      // 但是这在应对需要 npm install 一些新的 module 的时候，就需要重启服务
      ignored: /node_modules/,
      // 是否开始轮询，有的时候文件已经更改了但是却没有被监听到，这时候就可以开始轮询
      poll: devConfig.poll
    }
  },
  plugins: [
    // 这可以创建一个在编译过程中的全局变量
    // 因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号
    // 所以需要这么用
    // "process.env": JSON.stringify('development')
    // 或者
    // "process.env": '"production"'
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    // 开启大名鼎鼎的热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // 使用大名鼎鼎（词穷）的 html-webpack-plugin 模板插件
    new HtmlWebpackPlugin({
      // 输出的 html 文件的名字
      filename: "index.html",
      // 使用的 html 模板名字
      template: "index.html",
      // 是否要插入 weback 打包好的 bundle.js 文件
      inject: true
    })
  ]
})