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
```
npm install vue-cli -g
vue-cli init webpack -y new-project-name
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

------------------------------------------------------------------------

entry: { app: "src/main.js" }
error
webpack4 默认 entry 为 src/index.js

webpack  --config path 指定 config 路径地址

![图片](https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg)

~~asdasd~~
webpack plugin
```javascript
  class MyPlugin {
    constructor(options) {
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

Key	Command
Ctrl + B	Toggle bold
Ctrl + I	Toggle italic
Alt + S	Toggle strikethrough
Ctrl + Shift + ]	Toggle heading (uplevel)
Ctrl + Shift + [	Toggle heading (downlevel)
Ctrl + M	Toggle math environment
Alt + C	Check/Uncheck task list item





### webpack 4.x


### 纯手工搭建一个 webpack 4.x 脚手架