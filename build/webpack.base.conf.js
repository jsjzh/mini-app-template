var utils = require("./utils")
var config = require("../config")
var path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  context: utils.resolve("./"),
  entry: {},
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'assets': path.resolve(__dirname, '../src/assets')
    }
  },
  // 输出文件的目录
  output: {
    path: config.build.assetsRoot,
    filename: "[name]/index.js",
    publicPath: process.env.NODE_ENV === "production" ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 默认
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          },
          // 默认
          compiler: require('vue-template-compiler')
        }
      }, {
        test: /\.js$/,
        loader: "babel-loader",
        include: [utils.resolve('src'), utils.resolve('node_modules/webpack-dev-server/client')],
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: "vue-style-loader"
        }, {
          loader: "style-loader"
        }, {
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
        }, {
          loader: "postcss-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: []
}