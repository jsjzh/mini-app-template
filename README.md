# mini-app-template

## 介绍
在平时的项目中会碰到一些好的插件或者框架，想写下来当作一个小项目小 demo，遂想搭建一个可以自动处理 js html css 有热更新功能的 webpack 框架，不用于生产环境，暂时只有开发环境的配置。

使用 webpack4.x 打造。

## 开始一个项目
```
$ npm install
$ npm start
```

## 完成功能所需模块
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
    - 将CSS转换为CommonJS
      - css-loader
    
    - 将Sass编译成CSS
      - sass-loader
      - node-sass
    - css 补全计划
      - postcss-loader
      - autoprefixer
- 热更新
  - webpack-dev-server
