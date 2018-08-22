const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const utils = require("./utils");

const IP = utils.getIPAdress();
const POTR = 8081;

module.exports = {
  context: utils.resolve("./"),
  mode: "development",
  entry: {
    app: ["babel-polyfill", "./src/index.js"]
  },
  devtool: "cheap-module-eval-source-map",
  output: {
    path: utils.resolve("dist"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": utils.resolve("src"),
      "static": utils.resolve("static")
    }
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: [
          "raw-loader"
        ]
      }, {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: [utils.resolve("src"), utils.resolve("node_modules/webpack-dev-server/client")]
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
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  devServer: {
    clientLogLevel: "warning",
    hot: true,
    compress: true,
    port: POTR,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true,
    host: IP,
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
        messages: [`开发环境启动成功，项目运行在: http://${IP}:${POTR}`]
      },
      onErrors: utils.createNotifierCallback()
    })
  ]
}