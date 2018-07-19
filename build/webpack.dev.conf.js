var utils = require("./utils");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
var webpackBaseConfig = require('./webpack.base.conf');

var HelloWorldWebpackPlugin = require("./plugins/hello-world-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: utils.resolve("dist"),
    publicPath: "/"
  },
  plugins: [
    new HelloWorldWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new FriendlyErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: "index.html",
    //   inject: true
    // }),
  ]
})