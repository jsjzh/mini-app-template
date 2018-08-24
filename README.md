# mini-app-template

## 介绍
该 `template` 是所有带前缀 `mini-app` 的小项目的基础模板，在做项目的时候有的时候会想总结一些插件工具的用法，这个时候就会基于这个模板写一个项目的小 `demo`，还有的时候做面试题也会碰到一些好玩的面试题，又或者只是想记录一些好玩的 `js` 的方法，都可以以这个 `template` 为基础敲敲打打。

考虑到浏览器的情况，可能会需要做做 `ES6` 转 `ES5`，还希望用用 `sass` [（点我查看 sass 语法）](https://www.sass.hk/docs/) 让 `css` 写起来更舒畅一些，而且热更新的方法肯定是不能少的，每次都要 `F5` 不是很绝望么，我就以达到上述需求为目的，进行了该脚手架的开发。

项目中有一个 `study` 的目录，我的打算是在这个目录下存放一份当前环境下的 `build` 的配置详解，关于如何搭建等等也会在里面写一个 `README.md`，毕竟搭建的时候还是有一些小点需要注意的。

## mini-app 大合集
- [mini-app-template](https://github.com/jsjzh/mini-app-template) 这就是该项目
- [mini-app-tiny-code](https://github.com/jsjzh/mini-app-tiny-code) 一个收集 js 好玩的代码，好玩的面试题的地方


## 我该如何开始
首先一套组合拳，将项目拉到本地，这一步我们有两种做法。

### 方法一（推荐）
直接点击该项目右上角的 `fork`，在你的仓库中生成一份 `mini-app-template`，这样你不仅可以 `clone` 自己仓库中的 `mini-app-template` 代码，还可以 `pull request`，将你觉得这个项目可以完善的地方告诉我，我会及时查看并且合并的喔~笔芯 `*★,°*:.☆(￣▽￣)/$:*.°★* 。`

### 方法二
直接 clone 我的代码。
```
$ git clone https://github.com/jsjzh/mini-app-template.git
$ cd mini-app-template
$ npm install // or yarn
$ npm start // or yarn start
```

### 接着，如果我想创建一个新的 mini-app-new-app 怎么办
如果你想要以这个项目为模板，创建一个自己的 `mini-app` 用于展示

第一步：你需要删除 `mini-app-template` 目录下的 `.git`  
第二步：在 `git` 上新建一个新的项目，我这里假设新建的项目名称为 `mini-app-new-app`（第四行别忘了改 `jsjzh` 为你自己的 `git` 账号）
```
$ git init
$ git add .
$ git commit -m "nimi-app-new-app first commit oh yeah ~"
$ git remote add origin git@github.com:jsjzh/mini-app-new-app.git
$ git push -u origin master
```

最后，你就可以在这个项目下快乐的写自己的 `mini-app` 啦，撒花 万岁 `~\(≧▽≦)/~`

如果可以的话，请告诉我你的项目地址，我就可以把他们添加到我的 `mini-app` 列表中了。

代码如人生，我甘之如饴。

## 完成该项目功能所需模块整理
- js
  - ES6 转 ES5
    - babel-core
    - babel-loader
    - babel-preset-env
    - babel-preset-stage-2
  - 补全 ES5 没有的一些方法
    - babel-polyfill
- html
  - 使用 html 模板 并自动注入打包好的 js 文件
    - html-webpack-plugin
  - 将 html 文件转为字符串
    - raw-loader
- css
  - 处理 scss|sass|css 文件
    - 从JS字符串创建样式节点
      - style-loader
    - 将 css 转换为 commonJs
      - css-loader
    - 将 sass 转为 css
      - sass-loader
      - node-sass
    - css 补全计划
      - postcss-loader
      - autoprefixer
- 热更新
  - webpack-dev-server
