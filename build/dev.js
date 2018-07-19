// require('./check-versions')()
process.env.NODE_ENV = 'development'

var config = require('../config');
var utils = require('./utils');
var webpackConfig = require('./webpack.dev.conf');

var opn = require('opn');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddlerware = require('webpack-dev-middleware');
var webpackHotMiddlerware = require('webpack-hot-middleware');

var port = config.dev.port;
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
var ip = utils.getIPAdress();

var app = express();
var compiler = webpack(webpackConfig)

var devMiddleware = webpackDevMiddlerware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
var hotMiddleware = webpackHotMiddlerware(compiler, {
  log: false,
  heartbeat: 2000
})

app.use(hotMiddleware)
app.use(devMiddleware)

app.use(express.static("static"));

devMiddleware.waitUntilValid(() => {
  if (autoOpenBrowser) opn(`http://${ip}:${port}`)
  app.listen(port, ip)
})