const path = require('path');
const opn = require('opn');

var app = require('express')();

function resolve(file) {
  return path.resolve(__dirname, file)
}

console.log(resolve('dist'));

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: resolve('dist')
  }
};

app.get('/', function (req, res) {
  res.send('Hello World');
})

var server

server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
})


opn("http://localhost:3000")