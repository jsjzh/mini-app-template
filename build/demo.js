var opn = require("opn");
var path = require("path");

var express = require("express");

var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

var webpackBaseConfig = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    filename: "[name].js",
    path: resolve("dist")
  },
  mode: "development",
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "index.html",
      inject: true
    }),
    // new FriendlyErrorsPlugin()
  ]
}

var webpackDevConfig = {
  mode: "production"
}

// Object.keys(webpackBaseConfig.entry).forEach(entryName => {
//   webpackBaseConfig.entry[entryName] = ["webpack-hot-middleware/client?noInfo=true&reload=true"].concat(webpackBaseConfig.entry[entryName])
// })

webpackConfig = merge(webpackBaseConfig, webpackDevConfig);

function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

var app = express();

var compiler = webpack(webpackConfig);
webpack(webpackConfig, function () {})

// var devMiddleware = require("webpack-dev-middleware")(compiler, {
//   publicPath: webpackConfig.output.publicPath,
//   quiet: true
// })

// var hotMiddleware = require("webpack-hot-middleware")(compiler, {
//   log: false,
//   heartbeat: 2000
// })

// compiler.plugin("compilation", function (compilation) {
//   compilation.plugin("html-webpack-plugin-after-emit", function (data, cb) {
//     hotMiddleware.publish({
//       action: "reload"
//     });
//     cb()
//   })
// });

// compiler.plugin('compilation', function (compilation) {
//   console.log('The compiler is starting a new compilation...');
//   compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
//     console.log(htmlPluginData);
//     htmlPluginData.html += 'The magic footer';
//     callback(null, htmlPluginData);
//   });
// });

// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-before-html-generation', function (data, cb) {
//     console.log(data);
//     console.log("success");
//   })
// })

// app.use(hotMiddleware)
// app.use(devMiddleware)

app.use(express.static("static"));
app.listen(3000);


// devMiddleware.waitUntilValid(function () {
//   opn("http://localhost:3000");
// })