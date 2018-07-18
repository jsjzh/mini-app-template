const opn = require("opn");
const path = require("path");

const express = require("express");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const webpackConfig = {
  entry: {
    app: ["webpack-hot-middleware/client?noInfo=true&reload=true", "./src/index.js"]
  },
  output: {
    filename: "[name].js",
    path: resolve("dist")
  },
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: "My Webpack Template",
      template: "index.html"
    }),
    new FriendlyErrorsPlugin()
  ]
}

function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

const app = express();

const compiler = webpack(webpackConfig);

const devMiddleware = require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: false,
  heartbeat: 2000
})

// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({
//       action: 'reload'
//     });
//     cb()
//   })
// });

app.use(hotMiddleware)
app.use(devMiddleware)

app.use(express.static("static"));

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

var server;

devMiddleware.waitUntilValid(function () {
  server = app.listen(3000);
  opn("http://localhost:3000");
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}