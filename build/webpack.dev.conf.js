var utils = require("./utils");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
var webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: utils.resolve("dist"),
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "index.html",
      inject: true
    }),
  ]
})