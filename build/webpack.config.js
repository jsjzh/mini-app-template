const path = require('path');
const opn = require('opn');

const express = require('express');
var app = express();

function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

console.log(resolve('dist'));

module.exports = {
  entry: {
    app: './src/main.js'
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: '/'
  }
};

app.use(express.static('static'));
app.use(express.static('src'));

app.get("/", function (req, res) {
  res.sendFile(resolve("index.html"));
})

app.listen(3000);

opn("http://localhost:3000");