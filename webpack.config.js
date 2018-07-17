const path = require('path');

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