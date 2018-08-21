const path = require("path");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const packageConfig = require('../package.json');

function resolve(dir) {
  return path.join(__dirname, "..", dir)
}

function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
}

function createNotifierCallback() {
  var notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return
    var error = errors[0]
    var filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || ''
    })
  }
}

function assetsPath(_path) {
  return path.posix.join("static", _path)
}

const config = {
  context: resolve("./"),
  mode: "development",
  entry: {
    app: ["babel-polyfill", "./src/index.js"]
  },
  devtool: "cheap-module-eval-source-map",
  output: {
    path: resolve("dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
      'static': resolve('static')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src"), resolve("node_modules/webpack-dev-server/client")]
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
        }, {
          loader: "postcss-loader"
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  devServer: {
    clientLogLevel: "warning",
    hot: true,
    compress: true,
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true,
    host: getIPAdress(),
    publicPath: "/"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify("development")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    }),
    new FriendlyErrorsPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [`开发环境启动成功，项目运行在: http://${getIPAdress()}:8080`]
      },
      onErrors: createNotifierCallback()
    })
  ]
}

module.exports = config;