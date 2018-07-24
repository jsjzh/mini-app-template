![webpack](https://user-gold-cdn.xitu.io/2018/7/22/164c0198993dbc6b?w=497&h=270&f=jpeg&s=8974)

> 重新书写了博客内容，希望可以更好的呈现该有的知识点。
> bundle.js 指的是 webpack 打包后的文件。

## 小剧场
项目经理：我们要开始一个新的项目，裤裆你来负责项目构建吧。  
我：好的没问题，经理请稍等。  
```npm
npm install vue-cli -g
vue init webpack -y new-project-name
```
我：好了，我们开始吧。  
项目经理：接下来呢？  

![黑人问号脸](https://user-gold-cdn.xitu.io/2018/7/22/164c00814127bdae?w=440&h=252&f=jpeg&s=17614)

我：接下来没了，可以开发了。   
项目经理：裤裆啊，速度快是好事，但是我看你每次都是那么几步，能不能来点不一样的，你看那些面试官，面试手写一个 `webpack 4.x` 的配置，你知道怎么写么？  
我：。。。。。。  
项目经理：（拂袖而去，远远地听到空中传来一句话）年轻人，切勿急躁，稳中求胜啊。  
我：项目急的时候你不是这么说的。  
项目经理：裤裆你说啥？  
我：经理你说得对。  

## 前言
在我们在面对一个新的项目的时候，网上的大量优秀的模板可以使我们少走很多弯路，可以把主要的精力放在业务上，等到后期项目庞大了，业务复杂了的时候再去做一些优化，这其中包括项目打包速度优化，项目打包体积优化（也可以看做是首屏加载优化），等等，但是，身为一个爱折腾的程序猿，面对这些模板，是的，我很好奇！

![~~我很好骑~~](https://user-gold-cdn.xitu.io/2018/7/22/164c00a4dc82038e?w=750&h=422&f=jpeg&s=35529)

当然，文章开始之前，附上该项目的地址，[github@jsjzh](https://github.com/jsjzh/my-webpack-template)，所有的代码我都加上了注释，希望大家看完之后可以有所收获，最好能赏个 `star` 啦！=3=

```
git clone https://github.com/jsjzh/my-webpack-template.git
cd my-webpack-template
npm install
npm start
```

## `webpack 4.x` 的那些新玩意儿
在最新的 [官方文档](https://webpack.js.org/configuration/) 中，有两个新的配置项，`mode` 和 `optimization`，我们就从这两个入手，看看 `webpack .4x` 有什么新东西。

下面会介绍因为你配置了不同的 `mode` 之后，你的代码会受到的不同对待。

### `mode` 是个啥
这个配置项是区分 `webpack 4.x` 和其他版本最方便的手段，`webpack 4.x` 给我们提供了两个模式用作开发和生产的模式，这两个模式下 `webpack` 默默给我们开启了不少优化手段，当然，这些优化手段我们也是可以配置的，就是在 `optimization` 这个配置项中，我们也可以自己增加 `optimization` 选项对项目进行更细的优化。
```
production | development | none
```
下面我会对 `mode` 的两个值 `production` 和 `development` 进行比较详细的说明，看看 `webpack` 到底偷偷给我们开启了什么优化。

#### `prod` 和 `dev` 相同的优化
`mode: production || development` 时，`webpack` 都会开启的优化。
```json
{
  "mode": "production" || "development",
  "optimization": {
    // 如果 子模块 和 父模块 都加载了同一个 A模块 的时候，开启这个选项将会告诉 webpack 跳过在 子模块 中对 A模块 的检索，这可以加快打包速度。
    "removeAvailableModules": true,
    // webpack 将会不会去打包一个空的模块。
    "removeEmptyChunks": true,
    // 告诉 webpack 合并一些包含了相同模块的模块。
    "mergeDuplicateChunks": true,
    // 会在 process.env.NODE_ENV 中传入当前的 mode 环境。
    "nodeEnv": "production" || "development"
  }
}
```

#### `prod` 和 `dev` 不同的优化
`mode: production` 时，`webpack` 开启的优化。
```json
{
  "mode": "production",
  "optimization": {
    // 告诉 webpack 确定和标记块，这些块是其他块的子集，当更大的块已经被加载时，不需要加载这些子集。
    "flagIncludedChunks": true,
    // 告诉 webpack 找出一个模块的顺序，这可以使打包出来的入口 bundle.js 最小化。
    "occurrenceOrder": true,
    // 确定每个模块下导出被使用的。
    "usedExports": true,
    // 告诉 webpack 查找可以安全地连接到单个模块的模块图的片段。取决于优化。
    "concatenateModules": true,
    // 使用 UglifyjsWebpackPlugin 进行代码压缩。
    "minimize": true
  },
  // 性能相关配置
  "performance": {
    "hints": "error",
    // ...
  }
}
```
`mode: development` 时，`webpack` 开启的优化。
```json
{
  "mode": "development",
  // 生成 source map 的格式选择，这个选项可以直接影响构建速度。
  "devtool": "eval",
  // 缓存模块，避免在未更改时重建它们。
  "cache": true,
  "module": {
    // 缓存已解决的依赖项，避免重新解析它们。
    "unsafeCache": true
  },
  "output": {
    // 在 bundle.js 中引入项目所包含模块的注释信息。
    "pathinfo": true
  },
  "optimization": {
    // 在可能的情况下确定每个模块的导出。
    "providedExports": true,
    // 找到 chunk 中共享的模块，取出来生成单独的 chunk。
    // 该配置用于代码分割打包，取代了曾经的 CommonsChunkPlugin 插件。
    "splitChunks": true,
    // 为 webpack 运行时代码创建单独的 chunk。
    "runtimeChunk": true,
    // 编译错误时不写入到输出。
    // 取代了曾经的 NoEmitOnErrorsPlugin 插件。
    "noEmitOnErrors": true,
    // 给模块更有意义更方便调试的名称。
    // 取代了曾经的 NamedModulesPlugin 插件。
    "namedModules": true,
    // 给 chunk 更有意义更方便调试的名称。
    "namedChunks": true,
  }
}
```

## `webpack 4.x` 基础版开发环境详细配置
基础版拥有 `npm start` 之后 打开一个新的网页，并且更改 `js` 会自动更新的功能，不包含对 `ES6` 语法的转义以及 `css` 打包，`image` 图片转为 `dataURL` 的功能。

先来一套组合拳，创建一个项目文件夹，并初始化项目。
```
md my-webpack-template
cd my-webpack-template
npm init -y
```
接着可以参考我的目录结构（列出主要的文件，只针对 `dev` 环境）。
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
安装所需依赖。

`webpack` 和 `webpack-cli` 曾经是在一起的，在 `4.x` 版本中进行了拆分，所以如果不好好同时安装他们俩是不行的哦。
> 不推荐全局安装 webpack，这会导致命令行运行 webpack 的时候锁定版本。
```
npm install webpack webpack-cli -D
```
`webpack-dev-server` 是一个专门用于开发环境使用的集成了众多功能的环境，基于 `express`，拥有即时编译代码（`webapck-dev-middleware`），热更新（`webpack-hot-middleware`），自动打开浏览器（`opn`），对 `HTML5` 中 `history` 做特殊处理（`connect-history-api-fallback`）等等功能。
> 对于开发环境，即时编译的代码不会存储在硬盘中而是在内存中，这是由 webapck-dev-middleware 完成的功能。
```
npm install webpack-dev-server -D
```
用于合并 `webpack` 配置的，一般我们会把 `webpack` 的 `base` 配置和 `dev` 配置 和 `prod` 配置分开写，用这个工具就可以很方便的合并 `base` 和 `dev` 的配置。
```
npm install webpack-merge -D
```
一个用于处理打包这个进程的插件，可以清除打包时候残留的控制台信息，并且可以在控制台打印出打包成功之后的文字提示，当然，对于打包错误之后的回调也是有的。
```
npm install friendly-errors-webpack-plugin -D
```
这个相对来说各位看官应该用的很多了吧，用于生成一个 `html` 文件，并且可以在底部注入通过 `webpack` 打包好的 `bundle.js` 文件。
```
npm install html-webpack-plugin -D
```
一个寻找可用端口的工具，当你配置的端口被占用时，这个工具会自动寻找一个可用的端口。
```
npm install portfinder -D
```

### 配置 `package.json` 中的运行脚本
接着，安装完了依赖我们需要配置 `npm` 运行时候的脚本了。
> 当你在命令行直接输入 `webpack` 报错的，并且确信自己已经安装了 `webpack` 的时候，试试直接配置 `package.json` 中的 `scripts`，说不定你安装的是项目中的 `webpack`，而 `package.json` 中运行的脚本将优先该项目的环境。
```json
"scripts": {
  "dev": "webpack-dev-server --inline --progress --config build/build-server.js",
  "start": "npm run dev"
}
```

### `build/webpack.base.conf.js` 配置详解
先来配置 `webpack` 基础的配置，这里的配置 `prod` 和 `dev` 相同。
```javascript
// 将一些配置写在 config/index.js 中，方便直接获取
var config = require("../config");

// 获取项目的初始目录，包装了个小函数
function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

module.exports = {
  // webpack 处理打包文件的时候的初始目录
  context: resolve("./")，
  // 入口文件，webapck 4.x 默认的就是 src/index.js
  entry: {
    app: "./src/index.js"
  }，
  // 输出文件的目录
  output: {
    path: config.build.assetsRoot，
    filename: "[name].js"，
    publicPath: process.env.NODE_ENV === "production" ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  }
}
```

### `build/webpack.dev.conf.js` 配置详解
```javascript
// 将一些配置写在 config/index.js 中，方便直接获取
var config = require("../config");
var devConfig = config.dev;
// 一些工具函数
var utils = require("./utils");
// nodeJs 内置的函数，专门用来解析路径
var path = require("path");
// 大名鼎鼎的 webpack
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpackBaseConfig = require("./webpack.base.conf");

module.exports = merge(webpackBaseConfig，{
  // 配置开发环境 mode
  mode: "development"，
  // 一句话，这是个方便开发工具进行代码定位的配置
  // 但是不同的配置会影响编译速度和打包速度，这里使用了和 vue-cli 同样的配置
  devtool: devConfig.devtool，
  // 使用了 webpack-dev-server 之后就需要有的配置
  // 在这里可以配置详细的开发环境
  devServer: {
    // 当我们在 package.json 中使用 webpack-dev-server --inline 模式的时候
    // 我们在 chrome 的开发工具的控制台 console 可以看到信息种类
    // 可选 none error warning info
    clientLogLevel: "warning"，
    // 不用担心：要解决这个问题，你所需要做的就是在你的服务器上添加一个简单的万能回退路线。如果URL不匹配任何静态资产，那么它应该服务于相同的索引。你的应用程序所在的html页面。又漂亮! --- by vue-router
    // 这个配置就是应用了 connect-history-api-fallback 插件
    // 想象一个场景，vue 开发，我们利用 vue-router 的 history 模式进行单页面中的页面跳转
    // www.demo.com 跳转去 www.demo.com/list
    // 看起来没毛病，vue-router 中只要配置了 list 的路由即可
    // 但是，当你刷新页面的时候，浏览器会去向服务器请求 www.demo.com/list 的资源，这想当然是找不到的
    // 这个中间件就是会自动捕获这个错误，然后将它重新定位到 index.html
    historyApiFallback: {
      rewrites: [{
        from: /.*/，
        to: path.posix.join(devConfig.assetsPublicPath，"index.html")
      }]
    }，
    // webpack 最有用的功能之一 --- by webpack
    // 热更新装置启动
    hot: true，
    // 告诉 webpack-dev-server 搭建服务器的时候从哪里获取静态文件
    // 默认情况下，将使用当前工作目录作为提供静态文件的目录
    // contentBase: false，
    // 搭建的开发服务器启动 gzip 压缩
    compress: true，
    // 搭建的开发服务器的 host，这里使用了一个函数去获取当前电脑的局域网 ip
    // 这个可以获取你的电脑的 ip 地址，然后开发服务器就可以搭建在局域网里
    // 如果有一同开发的小伙伴，在同一局域网内就可以直接访问地址看到你的页面
    // 同样，这个也适用于手机，连上同一个 wifi 之后就可以在手机上实时看到修改的效果
    host: utils.getIPAdress()，
    // 开发服务器的端口号
    // 但是后面我们会用到 portfinder 插件，如果真的 config/index.js 中的端口被占用了
    // 那这个插件会以这个为 basePort 去找一个没有被占用的端口
    port: devConfig.port，
    // 是否要服务器搭建完成之后自动打开浏览器
    open: devConfig.autoOpenBrowser，
    // 是否打开发现错误之后在浏览器全屏幕显示错误信息功能
    overlay: devConfig.errorOverlay ? {
      warnings: false，
      errors: true
    } : false，
    // 此路径下的打包文件可在浏览器中访问
    // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js
    // 默认 publicPath 是 "/"，所以 bundle.js 可以通过 http://localhost:8080/bundle.js 访问
    publicPath: devConfig.assetsPublicPath，
    // 启动接口访问代理
    proxy: devConfig.proxyTable，
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    // 和 FriendlyErrorsPlugin 配合食用更佳
    quiet: true，
    // 开启监听文件修改的功能，在 webpack-dev-server 和 webpack-dev-middleware 中是默认开始的
    // watch: true，
    // 关于上面 watch 的一些选项配置
    watchOptions: {
      // 排除一些文件监听，这有利于提高性能
      // 这里排除了 node_modules 文件夹的监听
      // 但是这在应对需要 npm install 一些新的 module 的时候，就需要重启服务
      ignored: /node_modules/，
      // 是否开始轮询，有的时候文件已经更改了但是却没有被监听到，这时候就可以开始轮询
      // 但是比较消耗性能，选择关闭
      poll: devConfig.poll
    }
  }，
  plugins: [
    // 这可以创建一个在编译过程中的全局变量
    // 因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号 --- by webpack
    // 所以需要这么用
    // "process.env": JSON.stringify('development')
    // 或者
    // "process.env": '"development"'
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    })，
    // 开启大名鼎鼎的热更新插件
    new webpack.HotModuleReplacementPlugin()，
    // 使用大名鼎鼎（词穷）的 html-webpack-plugin 模板插件
    new HtmlWebpackPlugin({
      // 输出的 html 文件的名字
      filename: "index.html"，
      // 使用的 html 模板名字
      template: "index.html"，
      // 是否要插入 weback 打包好的 bundle.js 文件
      inject: true
    })
  ]
})
```

### `build/build-server.js` 配置详解
```javascript
// 更友好的提示插件
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// 获取一个可用的 port 的插件
var portfinder = require("portfinder");
var devWebpackConfig = require("./webpack.dev.conf");

// 导出一个 promise 函数，这可以让 wepback 接受一个异步加载的配置
// 并在 resolve 的时候运行 这个配置
// 比如这里我就用到了 portfinder 和 friendly-errors-webpack-plugin
module.exports = new Promise((resolve，reject) => {
  // 设置插件的初始搜寻端口号
  portfinder.basePort = devWebpackConfig.devServer.port
  portfinder.getPort((err，port) => {
    if (err) reject(err)
    else {
      // 这里就利用 portfinder 得到了可以使用的端口
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        // 清除控制台原有的信息
        clearConsole: true，
        // 打包成功之后在控制台给予开发者的提示
        compilationSuccessInfo: {
          messages: [`开发环境启动成功，项目运行在: http://${devWebpackConfig.devServer.host}:${port}`]
        }，
        // 打包发生错误的时候
        onErrors: () => { console.log("打包失败") }
      }))
      resolve(devWebpackConfig)
    }
  })
})
```

### 编译出错了？看看这里
> 如果你发现直接在控制台执行 `webpack` 报错了，但是你确实执行了 `npm install`，那是因为你没有安装全局的 `webpack。`  

- 可以执行 `.\node_modules\.bin\webpack --config webpack.config.js`
  - 调用该项目 `node_modules` 下的 `webpack`
- 使用 `package.json` 配置让 `npm` 去找该项目中的 `webpack`
  - `package.json > scripts.build: webapck`

> `DeprecationWarning: Tapable.plugin is deprecated. Use new API on '.hooks' instead`  

这个错误会发生在你使用的插件没有针对 webpack 4.x 升级。
这个时候只能去 `github` 提 `issue` 或者换一个 `plugin` 了。

> 还发现了其他的错？请直接私信我，或者在评论中留言。

## 后语
希望自己所做的一些微小的事情可以帮助大家在漫漫前端路中更上一层楼，另外，周末了不要太沉迷于敲代码，多出去走走，散散步，运动运动，给自己的一周充实的大脑放个空。

如果大家觉得我哪里写的不对，请不要犹豫，直接 diss 我 =3=

代码如人生，我甘之如饴。

我在这里 [gayhub@jsjzh](https://github.com/jsjzh) 欢迎来找我玩儿

> 向前看就是未来，向后看就是过去，从中取一段下来就是故事，而这只不过是那样的故事中很小的一部分而已。--- 灰色的果实

## 大纲
- `webpack 4.x` 的那些新玩意儿（DONE）
  - `mode`
  - `optimization`
- `webpack 4.x` 基础版开发环境详细配置（DONE）
  - `package.json` 中的 `devDependencies`
  - `package.json` 中的 `scripts`
  - `build/webpack.base.conf.js` 配置详解
  - `build/webpack.dev.conf.js` 配置详解
  - `build/build-server.js` 配置详解
- `webpack 4.x` 升级版开发环境详细配置（TODO）[分篇]
  - 利用 `babel` 转换 `ES6` 语法
  - 将 `img` 转为 `dataURL`
  - 打包 `css`
  - 使用 `vue-loader` 或其他 `loader` 来完成更多
  - 自己动手开发一个 `webpack-plugin`
- `webpack 4.x` 生产环境详细配置（TODO）[分篇]
- `webpack` 配置优化（TODO）[分篇]
  - 打包速度优化
  - 打包体积优化