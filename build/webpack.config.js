const opn = require('opn');
const path = require('path');

const express = require('express');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: "my-webpack-template",
      template: "index.html"
    })
  ]
}

function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

app.use(hotMiddleware)
app.use(devMiddleware)
app.use(express.static('static'));

app.listen(3000);

opn("http://localhost:3000");