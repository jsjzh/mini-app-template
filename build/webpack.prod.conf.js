var utils = require("./utils");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  output: {
    filename: "[name].js",
    path: utils.resolve("dist"),
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "index.html",
      inject: true
    }),
  ]
})