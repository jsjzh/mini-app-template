# my-webpack-template

## 大纲

- webpack 4.x 新特性
  - mode
    - development
    - production
      - 代码混淆
- 手工搭建 webpack 4.x 基础脚手架
  - package.json 中 所有的 module 介绍
  - webpack 插件介绍
  - webpack 参数介绍
- 基础脚手架升级版
  - 支持转换 js 语法
  - 支持打包 css
  - 支持将 img 转为 dataURL

## 小剧场

项目经理：我们要开始一个新的项目，裤裆你来负责项目构建吧。  
我：好的没问题，稍等。  
```npm
npm install vue-cli -g
vue init webpack -y new-project-name
```
项目经理：接下来呢？  
我：接下来没了，可以开发了。 

![黑人问号脸](问号脸)

项目经理：裤裆啊，过来，速度快是好事，但是我看你每次都是那么几步，能不能来点不一样的，你看那些面试官，面试手写一个 webpack 4.x 的配置，你知道怎么写么？  
我：。。。  
项目经理：（拂袖而去，远远地听到空中传来一句话）年轻人，切勿急躁，稳中求胜啊。  
我：项目急的时候你不是这么说的。  
项目经理：裤裆你说啥？  
我：经理你说得对。  

## 前言

在面对一个新的项目的时候，网上的大量模板往往可以使我们在项目刚起步的时候少走很多弯路，可以把主要的精力放在业务上，等到后期项目庞大了，业务复杂了的时候再去做一些优化，这其中包括项目打包速度优化，项目打包体积优化（也可以看做是首屏加载优化），等等，但是，身为一个爱折腾的程序猿，面对这些模板，是的，我很好奇！

![动漫图片 我很好奇！](很好奇)

花了四五天的时间，看源码，查资料，搭建项目跑测试，终于对于手工搭建一个 webpack 配置有了一些心得，希望我的分享可以给同样想更深一步了解 webpack 这个神器的大家一些帮助，我会介绍 vue-cli webpack 的模板中用的各种插件的功能，并且也会介绍关于 webpack 4.x 的改变，其中也会有迁移项目到 webpack 4.x 的教程，最后会搭建一个基础的 webpack 脚手架配置，关于后续的脚手架升级扩展（ES6语法，图片转为 dataURL，CSS 打包，项目的打包优化，考虑新开一篇深度讨论）  

当然，对于喜欢自己研究的大伙儿肯定不想只单单是看看文章，[这里是我的项目地址](https://github.com/jsjzh/my-webpack-template)，所有的代码我都加上了注释，希望大家看完之后赏个 star 吧。=3=  

另外，推荐大家直接看 webpack 的源站，虽然中文文档的确在初期给了我很多帮助，但是对于一些新的更新的东西，文档里面还是没有的（嘛，毕竟大佬们都是在自己的休息时间自愿帮忙的，我们也不能奢求太多）。推荐网易有道词典，划词直接翻译，对于阅读英文网站还是很有帮助的。  

## webpack 4.x 的一些改变

可以从最新的文档里面发现新增了两个配置项，mode 和 optimization，号称是零配置的 webpack 4.x 在设置了 mode 之后，的确减少了许多麻烦，下面会介绍因为你配置的 mode 的不同你的代码会受到的不同的对待。

### mode 配置导致的那些不同与相同
- mode
  - development
  - production
- [optimization](https://webpack.js.org/configuration/optimization/)
  - optimization.minimize
    - 使用 UglifyjsWebpackPlugin 进行代码压缩
    - production 为 true
  - optimization.minimizer
    - 你可以从这里配置 UglifyjsWebpackPlugin 代码压缩规则
      - minimizer: [ new UglifyJsPlugin({ /* your config */ }) ]
  - optimization.splitChunks
    - 该配置用于代码分割打包，取代了曾经的 CommonsChunkPlugin 插件，这个插件就是优化相关的操作了，此篇搭建基础的 webapck 里暂时不细究。

#### common
- optimization.removeAvailableModules
  - 如果 子模块 和 父模块 都加载了同一个 A模块 的时候，开启这个选项将会告诉 webpack 跳过在 子模块 中对 A模块 的检索，这可以加快打包速度。
- optimization.removeEmptyChunks
  - webpack 将会跳过打包一个空的模块。
- optimization.mergeDuplicateChunks
  - 告诉 webpack 合并一些包含了相同模块的块。

#### development
- devtool:eval
  - 调试
- cache:true
  - 缓存模块, 避免在未更改时重建它们。
- module.unsafeCache:true
  - 缓存已解决的依赖项, 避免重新解析它们。
- output.pathinfo:true
  - 在 bundle 中引入「所包含模块信息」的相关注释
- optimization.providedExports:true
  - 在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
- optimization.splitChunks:true
  - 找到chunk中共享的模块,取出来生成单独的chunk
- optimization.runtimeChunk:true
  - 为 webpack 运行时代码创建单独的chunk
- optimization.noEmitOnErrors:true
  - 编译错误时不写入到输出
- optimization.namedModules:true
  - 给模块有意义的名称代替ids
- optimization.namedChunks:true
  - 给模chunk有意义的名称代替ids

#### production
- performance:{hints:"error"....}
  - 性能相关配置
- optimization.flagIncludedChunks:true
  - 某些chunk的子chunk以一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
- optimization.occurrenceOrder:true
  - 给经常使用的ids更短的值
- optimization.usedExports:true
  - 确定每个模块下被使用的导出
- optimization.sideEffects:true
  - 识别package.json or rules sideEffects 标志
- optimization.concatenateModules:true
  - 尝试查找模块图中可以安全连接到单个模块中的段。
- optimization.minimize:true
  - 使用uglify-js压缩代码

#### 那些被忽略的
- optimization.nodeEnv
  - process.env.NODE_ENV
- optimization.minimizer
- optimization.mangleWasmImports

webpack 4.x default entry 为 src/index.js

## 让我们开始吧
纯手工写一个 webpack 的配置，首先，我们需要建立项目的初始目录，这里参考了 [vue-cli webpack](https://github.com/vuejs-templates/webpack) 的目录的模板，将构建和基础配置分开存放，需要修改的时候修改 config 文件，比较方便（但其实如果要修改还真的不只是只修改 config 就行的）。


别的咱不说了，先来一套组合拳  
```
md my-webpack-template
cd my-webpack-template
npm init -y
```
我的目录结构
```

```
安装所需依赖，这里为了区分类别，没有将 install 的放在一起，下面有放在一起的版本，可以直接复制使用。
```
npm install webapck webpack-cli -D
npm install webpack-dev-server -D
npm install webpack-merge friendly-errors-webpack-plugin html-webpack-plugin -D
npm install opn portfinder -D
```
安装所需依赖的全套版本（若已经执行过上个操作这里就可以跳过）。
```
npm install webapck webpack-cli webpack-dev-server webpack-merge friendly-errors-webpack-plugin html-webpack-plugin opn portfinder -D
```

### 你让我安装了什么？
各位看官莫慌，且听我一一道来，我的废话比较多，这里不仅有介绍安装的东西是个啥，还有包括我寻找资料的时候的附带了解到的知识，各位看官不要错过了。

- webapck webpack-cli
  - 曾经他们是一体的，但是当 webpack 升级到 4.x 版本之后，为了体现出模块化的思想，他们被无情的拆分开了，原先好好的在一起的现在却突然被迫分开，心里自然是一万个不愿意，所以如果你没有同时安装他们 webpack 可是不会正常工作的。
- webpack-dev-server
  - 一开始我使用的是 express + webpack-dev-middleware + webpack-hot-middleware + connect-history-api-fallback 来搭建的本地开发服务器，但是到后面发现其实自己写肯定不如官方给的那么严谨，虽然用的中间件都差不多，但是相对于官方给的，自己写的还需要在应用的入口增加 webpack-hot-middleware/client?noInfo=true&reload=true 的参数，而且还要自己处理 module.hot.accept，还需要在 express 中配置静态文件的地址，如果有跨域的话还需要增加 http-proxy-middleware 中间件，太麻烦了，既然是自己配置，那自然是一切从简，如果有人想要自己 diy 一个 webpack-dev-server 的话，可以看看 build/dev.js 文件，那是我的第一版。
- webapck-merge
  - 用于合并 werbpack 配置的，一般我们会把 webpack 的 base 配置和 dev 配置 和 prod 配置分开写，用这个工具就可以很方便的合并 base 和 dev 的配置。
- friendly-errors-webpack-plugin
  - 一个用于处理打包这个进程的插件，可以清除打包时候残留的控制台信息，并且可以在控制台打印出打包成功之后的文字提示，当然，对于打包错误之后的回调也是有的。
- html-webpack-plugin
  - 各位应该用的很多了吧，用于生成一个 html 文件，并且可以在底部注入通过 webpack 打包好的 bundle.js 文件。
- opn
  - 一个可以帮你直接打开浏览器的工具，只要给他一个地址即可，在这里就是为了用着方便，可以直接打开已经跑成功了的项目。
- portfinder
  - 这也是一个比较好用的工具，不知道大家有没有碰到过端口被占用的时候，这个工具就是为此而生，他的回调会给予一个可以使用的端口。

### 上配置
首先是 build 目录下，因为是搭建开发环境，所以我们需要 webapck.base.conf.js 和 webpack.dev.conf.js 文件，并且，不要忘了在 config 目录下我们需要一个用于区分开发和生产环境配置的文件 index.js。

webpack.base.conf.js
```javascript
var utils = require("./utils")
var config = require("../config")

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
```

webapck.dev.conf.js
```javascript
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

var utils = require("./utils")

var devConfig = config.dev;

var devWebpackConfig = merge(webpackBaseConfig, {
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
    host: utils.getIPAdress(),
    // host: devConfig.host,
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
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    })
  ]
})

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
        onErrors: devConfig.notifyOnErrors ? utils.createNotifierCallback() : ""
      }))
      resolve(devWebpackConfig)
    }
  })
})
```



------------------------------------------------------------------------

直接执行 webpack 可能会出错，因为没有安装全局的 webpack，其实这也是推荐的方法，那我们有两种方法启动它。
直接调用 node_modules 下的 webpack
另外有需要注意的，在 windows 下不能使用 ./，他会报错 . 模块找不到，将 / 改成 \ 即可
.\node_modules\.bin\webpack --config webpack.config.js

or

使用 npm 去调用 他会默认使用当前项目下的模块
package.json
  scripts.build: webpack

entry: { app: "src/main.js" }
error
webpack4 默认 entry 为 src/index.js

webpack  --config path 指定 config 路径地址

![图片](https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg)

vue-loader 实现的功能

webpack plugin
```javascript
  class MyPlugin {
    varructor(options) {
      options = options || {};
    }
    apply(compiler) {
      console.log("success");
    }
  }
```
plugins: [new MyPlugin({})]


webpack-dev-server --inline
HMR

DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    if (compiler.hooks) {
      ...
    }

webpack 打包优化
https://www.webpackjs.com/plugins/split-chunks-plugin/

write-file-webpack-plugin 源码了解一下

Tapable
webpack4 编写插件原先的 tapable.plugin 被废除了，推荐使用 .hooks
学习可以直接看 html-webpack-plugin 的插件源码
https://segmentfault.com/a/1190000008060440

vue-loader
https://vue-loader.vuejs.org/guide/#vue-cli

https://www.cnblogs.com/wangpenghui522/p/6826182.html
https://segmentfault.com/q/1010000011431180
https://segmentfault.com/a/1190000011761345
https://segmentfault.com/a/1190000011761306
http://www.lixuejiang.me/2017/11/05/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%E5%B0%8F%E7%BB%93/

inline和HMR不同，inline是刷新页面，HMR是只刷新修改的部分。换句话说，HMR可以保留页面的状态，这在组件化开发的页面中会很有用。不过在实际开发过程中，不同的状态往往是互相关联的，所以HMR有时也不好用。但这个思想是比inline好些的。

webpack-dev-middleware
https://www.npmjs.com/package/webpack-dev-middleware
配合 express 和 webpack-hot-milldeware 进行开发，可以将编译后的文件写入内存进行调试。
值得注意的是这个中间件执行的是编译而不是重载，需要配合 webapck-hot-middleware 才可以进行浏览器重载。

connect-history-api-fallback
https://segmentfault.com/a/1190000007890379
该中间件是针对单页面应用（SPA）使用的。想想这样的场景，入口为 index.html，在浏览器地址为 www.mydomain.com，当使用 html5 中的 history 模式（比如 vue-router 中开启 history 模式）进行单页面中页面的跳转，跳转到 www.mydomain.com/list，页面，这个时候，如果进行了刷新操作，这个时候服务器就会去找寻 www.mydomain.com/list 的资源，但其实我们只是用了 history 进行页面导航而已，服务器并没有这个资源。

Alt + S	Toggle strikethrough