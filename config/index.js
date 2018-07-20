var path = require('path')

function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

module.exports = {
  dev: {
    env: require('./dev.env'),
    host: "localhost",
    // 初始端口号，但是如果该端口被占用会自动找下一个可用端口
    port: 8080,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    devtool: 'cheap-module-eval-source-map',
    // 是否打开出现错误就在浏览器中全屏黑底显示错误位置
    errorOverlay: true,
    notifyOnErrors: true,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    poll: false,
    proxyTable: {}
  },

  build: {
    env: require('./prod.env'),
    assetsRoot: resolve('./dist'),
    assetsPublicPath: '/'
  }

}