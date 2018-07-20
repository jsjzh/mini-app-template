var utils = require("./utils");
const config = require('../config')

module.exports = {
  context: utils.resolve('../'),
  entry: {
    app: [utils.resolve("src/index.js")]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  }
}