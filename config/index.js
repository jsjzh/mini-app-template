var path = require('path')

function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

module.exports = {
  prod: {
    env: require('./prod.env'),
    // index: path.resolve(__dirname, '../dist/index.html'),
    // assetsRoot: path.resolve(__dirname, '../dist'),
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '/ponysafety2/',
    // productionSourceMap: false,
    // // Gzip off by default as many popular static hosts such as
    // // Surge or Netlify already gzip all static assets for you.
    // // Before setting to `true`, make sure to:
    // // npm install --save-dev compression-webpack-plugin
    // productionGzip: false,
    // productionGzipExtensions: ['js', 'css'],
    // // Run the build command with an extra argument to
    // // View the bundle analyzer report after build finishes:
    // // `npm run build --report`
    // // Set to `true` or `false` to always turn it on or off
    // bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    host: "localhost",
    port: 8080,
    autoOpenBrowser: true,
    devtool: 'cheap-module-eval-source-map',
    errorOverlay: true,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    poll: false,
    proxyTable: {},
    // proxyTable: {
    //   '/ponysafety2/': {
    //     target: 'http://47.97.8.7:8080',
    //     // target: 'http://101.37.163.185:8080',
    //     // target: 'http://192.168.0.148:8088',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/ponysafety2/': '/ponysafety2/'
    //     }
    //   }
    // },
    // // CSS Sourcemaps off by default because relative paths are "buggy"
    // // with this option, according to the CSS-Loader README
    // // (https://github.com/webpack/css-loader#sourcemaps)
    // // In our experience, they generally work as expected,
    // // just be aware of this issue when enabling this option.
    // cssSourceMap: false
  }
}