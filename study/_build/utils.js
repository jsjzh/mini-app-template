'use strict'
var path = require('path')
var os = require('os')
const packageConfig = require('../package.json')
var config = require('../config')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.resolve = function (file) {
  return path.resolve(__dirname, "../", file)
}

exports.getIPAdress = function () {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

exports.createNotifierCallback = function () {
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

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// exports.assetsPath = function (_path) {
//   var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
//     config.build.assetsSubDirectory :
//     config.dev.assetsSubDirectory
//   return path.posix.join(assetsSubDirectory, _path)
// }

// exports.cssLoaders = function (options) {
//   options = options || {}

//   var cssLoader = {
//     loader: 'css-loader',
//     options: {
//       minimize: process.env.NODE_ENV === 'production',
//       sourceMap: options.sourceMap
//     }
//   }

//   // generate loader string to be used with extract text plugin
//   function generateLoaders(loader, loaderOptions) {
//     var loaders = [cssLoader]
//     if (loader) {
//       loaders.push({
//         loader: loader + '-loader',
//         options: Object.assign({}, loaderOptions, {
//           sourceMap: options.sourceMap
//         })
//       })
//     }

//     // Extract CSS when that option is specified
//     // (which is the case during production build)
//     if (options.extract) {
//       return ExtractTextPlugin.extract({
//         use: loaders,
//         fallback: 'vue-style-loader'
//       })
//     } else {
//       return ['vue-style-loader'].concat(loaders)
//     }
//   }

//   // https://vue-loader.vuejs.org/en/configurations/extract-css.html
//   return {
//     css: generateLoaders(),
//     postcss: generateLoaders(),
//     less: generateLoaders('less'),
//     sass: generateLoaders('sass', {
//       indentedSyntax: true
//     }),
//     scss: generateLoaders('sass'),
//     stylus: generateLoaders('stylus'),
//     styl: generateLoaders('stylus')
//   }
// }

// // Generate loaders for standalone style files (outside of .vue)
// exports.styleLoaders = function (options) {
//   var output = []
//   var loaders = exports.cssLoaders(options)
//   for (var extension in loaders) {
//     var loader = loaders[extension]
//     output.push({
//       test: new RegExp('\\.' + extension + '$'),
//       use: loader
//     })
//   }
//   return output
// }