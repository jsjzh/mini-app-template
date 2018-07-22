# 超详细以至于被人当成话痨 webpack 4.x 纯手工搭建 基础开发环境

![webpack](https://user-gold-cdn.xitu.io/2018/7/22/164c0198993dbc6b?w=497&h=270&f=jpeg&s=8974)

> 向前看就是未来，向后看就是过去，从中取一段下来就是故事，而这只不过是那样的故事中很小的一部分而已。--- 灰色的果实

## 大纲
- webpack 4.x 的那些新玩意儿
  - mode
  - optimization
- 从 webpack 3.x 到 webpack 4.x 我应该做什么的
- webpack 4.x 基础版开发环境详细配置
  - package.json 中 的 devDependencies
  - package.json 中 的 scripts
  - build/webpack.base.conf.js 配置详解
  - build/webpack.dev.conf.js 配置详解
  - build/build-server.js 配置详解
- webpack 4.x 升级版开发环境详细配置
  - babel 支持 ES6 语法
  - img 转为 dataURL
  - 打包 css
  - 使用 vue-loader 来完成更多
  - 开发一个 webpack-plugin
- webpack 4.x 生产环境详细配置
- webpack 配置优化
  - 打包速度优化
  - 打包体积优化

## 小剧场
项目经理：我们要开始一个新的项目，裤裆你来负责项目构建吧。  
我：好的没问题，稍等。  
```npm
npm install vue-cli -g
vue init webpack -y new-project-name
```
项目经理：接下来呢？  
我：接下来没了，可以开发了。 

![黑人问号脸](https://user-gold-cdn.xitu.io/2018/7/22/164c00814127bdae?w=440&h=252&f=jpeg&s=17614)

项目经理：裤裆啊，过来，速度快是好事，但是我看你每次都是那么几步，能不能来点不一样的，你看那些面试官，面试手写一个 webpack 4.x 的配置，你知道怎么写么？  
我：。。。  
项目经理：（拂袖而去，远远地听到空中传来一句话）年轻人，切勿急躁，稳中求胜啊。  
我：项目急的时候你不是这么说的。  
项目经理：裤裆你说啥？  
我：经理你说得对。  

## 前言
在面对一个新的项目的时候，网上的大量模板往往可以使我们在项目刚起步的时候少走很多弯路，可以把主要的精力放在业务上，等到后期项目庞大了，业务复杂了的时候再去做一些优化，这其中包括项目打包速度优化，项目打包体积优化（也可以看做是首屏加载优化），等等，但是，身为一个爱折腾的程序猿，面对这些模板，是的，我很好奇！

![~~我很好奇~~](https://user-gold-cdn.xitu.io/2018/7/22/164c00a4dc82038e?w=750&h=422&f=jpeg&s=35529)

花了四五天的时间，看源码，查资料，搭建项目跑测试，终于对于手工搭建一个 webpack 配置有了一些心得，希望我的分享可以给同样想更深一步了解 webpack 这个神器的大家一些帮助，我会介绍 vue-cli webpack 的模板中用的各种插件的功能，并且也会介绍关于 webpack 4.x 的改变，其中也会有迁移项目到 webpack 4.x 的教程，最后会搭建一个基础的 webpack 脚手架配置，关于后续的脚手架升级扩展（ES6语法，图片转为 dataURL，CSS 打包，项目的打包优化，会新开几篇着重讲讲）  

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
我的目录结构（列出主要的文件,只针对 dev 环境）
```
+---my-webpack-template
|       index.html
|       package.json
+---build
|       utils.js
|       build-server.js
|       webpack.base.conf.js
|       webpack.dev.conf.js
+---config
|       index.js
|       dev.env.js
+---src
|       index.js
```
安装所需依赖，这里为了区分类别，没有将 install 的放在一起，下面有放在一起的版本，可以直接复制使用。
```
npm install webapck webpack-cli -D
npm install webpack-dev-server -D
npm install webpack-merge friendly-errors-webpack-plugin html-webpack-plugin -D
npm install portfinder -D
```
安装所需依赖的全套版本（若已经执行过上个操作这里就可以跳过）。
```
npm install webapck webpack-cli webpack-dev-server webpack-merge friendly-errors-webpack-plugin html-webpack-plugin portfinder -D
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
    app: "./src/index.js"
  },
  // 输出文件的目录
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
```

build-server.js
```javascript
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
```

### 需要注意的小点
直接执行 webpack 可能会出错，因为没有安装全局的 webpack，其实这也是推荐的方法，那我们有两种方法启动它。
直接调用 node_modules 下的 webpack
另外有需要注意的，在 windows 下不能使用 ./，他会报错 . 模块找不到，将 / 改成 \ 即可
.\node_modules\.bin\webpack --config webpack.config.js

or

使用 npm 去调用 他会默认使用当前项目下的模块
package.json
  scripts.build: webpack

webpack  --config path 指定 config 路径地址

Tapable
webpack4 编写插件原先的 tapable.plugin 被废除了，推荐使用 .hooks
DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
if (compiler.hooks) {
  ...
}

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

vue-loader 实现的功能

webpack-dev-server --inline
HMR
inline和HMR不同，inline是刷新页面，HMR是只刷新修改的部分。换句话说，HMR可以保留页面的状态，这在组件化开发的页面中会很有用。不过在实际开发过程中，不同的状态往往是互相关联的，所以HMR有时也不好用。但这个思想是比inline好些的。

write-file-webpack-plugin 源码了解一下

webpack-dev-middleware
https://www.npmjs.com/package/webpack-dev-middleware
配合 express 和 webpack-hot-milldeware 进行开发，可以将编译后的文件写入内存进行调试。
值得注意的是这个中间件执行的是编译而不是重载，需要配合 webapck-hot-middleware 才可以进行浏览器重载。