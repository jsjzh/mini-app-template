const utils = require("./utils")
const config = require("../config")
const path = require("path")

module.exports = {
  // webpack 处理打包文件的时候的初始目录
  context: utils.resolve("./"),
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
  // 比如，在 index.html 中引入 jquery 那就在这加上
  externals: {
    jquery: 'jQuery'
  },
  performance: {
    // 超过一定大小的 bundle 提示的错误类型
    hints: "warning",
    // 入口文件的提示限制大小
    maxEntrypointSize: "",
    // 所有从 webpack 生成的 asset 的提示限制大小
    maxAssetSize: "",
    // 哪些文件需要被提示
    assetFilter: "",
  },
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: process.env.NODE_ENV === "production" ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    // 当 webpack 去寻找 modules 的时候，如果使用了 import file from 'file' webpack 会去寻找 file.js 和 file.json
    extensions: ['.js', '.json'],
    alias: {
      '@': utils.resolve('./src'),
      'static': utils.resolve('./static')
    }
  },
  module: {
    // 不要解析某些 module
    // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。
    noParse: function (content) {
      return /jquery|lodash/.test(content);
    },
    // Rule 条件
    // 条件有两种输入值：
    // resource：请求文件的绝对路径。它已经根据 resolve 规则解析。
    // issuer: 被请求资源(requested the resource)的模块文件的绝对路径。是导入时的位置。
    // 例如: 从 app.js 导入 './style.css'，resource 是 /path/to/style.css. issuer 是 /path/to/app.js。
    // 在规则中，属性 test, include, exclude 和 resource 对 resource 匹配，并且属性 issuer 对 issuer 匹配。

    // Rule 结果
    // 规则结果只在规则条件匹配时使用。
    // 规则有两种输入值：
    // 应用的 loader：应用在 resource 上的 loader 数组。
    // Parser 选项：用于为模块创建解析器的选项对象。
    // 这些属性会影响 loader：loader, options, use。
    // 也兼容这些属性：query, loaders。
    // enforce 属性会影响 loader 种类。不论是普通的，前置的，后置的 loader。
    // parser 属性会影响 parser 选项。

    // { test: Condition }：匹配特定条件。一般是提供一个正则表达式或正则表达式的数组，但这不是强制的。

    // { exclude: Condition }：排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。
    // { and: [Condition] }：必须匹配数组中的所有条件
    // { or: [Condition] }：匹配数组中任何一个条件
    // { not: [Condition] }：必须排除这个条件
    rules: [{}]
  }
}