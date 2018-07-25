const path = require("path")

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const portfinder = require("portfinder")
// vue-loader v15 必须
const VueLoaderPlugin = require("vue-loader/lib/plugin")
// webpack 4.x 以上版本使用的提取 css
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 压缩 css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const notifier = require("node-notifier")


const utils = require("./utils")
const config = require("../config")
const packageConfig = require('../package.json')

const {
  pages
} = require("../config/pages")

const isProduction = process.env.NODE_ENV === "production" ? true : false;

function resolve(file) {
  // 获取结对路径常用
  return path.resolve(__dirname, "../", file)
}

function assetsPath(_path) {
  const assetsSubDirectory = isProduction ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  // 获取相对目录常用 用于拼接
  return path.posix.join(assetsSubDirectory, _path)
}

function getCommonJsPath(fileName) {
  return resolve(`src/common/js/${fileName}.js`);
}

function getPageHtmlPath(fileName) {
  return resolve(`src/pages/${fileName}/index.html`);
}

function createNotifierCallback() {
  return (severity, errors) => {
    if (severity !== "error") return
    var error = errors[0]
    var filename = error.file && error.file.split("!").pop()
    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || ""
    })
  }
}

// 自动添加后缀 TODO
function testSuffix(file) {
  return file.test()
}

const entry = {};
const plugins = [new VueLoaderPlugin()];

pages.forEach(page => {
  let _entryJs = [resolve(`${page.path}/${page.entryJs}`)];
  page.commonJss.reverse().forEach(commonJs => {
    commonJs ? _entryJs.unshift(getCommonJsPath(elem)) : undefined;
  })
  entry[page.name] = ["babel-polyfill"].concat(_entryJs);
  plugins.push(new MiniCssExtractPlugin({
    filename: "[name]/index.css",
    chunkFilename: "[name].css"
  }))
  plugins.push(new HtmlWebpackPlugin({
    title: page.title,
    filename: `${page.name}/index.html`,
    template: getPageHtmlPath(page.name),
    inject: true,
    chunks: [page.name],
  }))
});

const webpackConfig = {
  mode: isProduction ? "production" : "development",
  context: resolve("./"),
  entry,
  output: {
    path: config.build.assetsRoot,
    filename: "[name]/index.js",
    publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "vue$": "vue/dist/vue.esm.js",
      "@": resolve("src"),
      "common": resolve("src/common"),
      "assets": resolve("src/assets"),
      "components": resolve("src/components"),
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: "vue-loader"
    }, {
      test: /\.js$/,
      loader: "babel-loader",
      include: [resolve("src"), resolve("node_modules/webpack-dev-server/client")],
      exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file))
    }, {
      test: /\.(c|sc|sa)ss$/,
      use: [{
        loader: "vue-style-loader"
      }, {
        loader: "style-loader"
      }, {
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "css-loader",
        // options: {
        //   alias: {
        //     "common": resolve("src/common"),
        //   }
        // }
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader"
      }]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        name: assetsPath("img/[name].[hash:7].[ext]")
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        name: assetsPath("media/[name].[hash:7].[ext]")
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        name: assetsPath("fonts/[name].[hash:7].[ext]")
      }
    }]
  },
  plugins
}

module.exports = webpackConfig