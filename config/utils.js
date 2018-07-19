const path = require('path')

exports.resolve = function (file) {
  return path.resolve(__dirname, "../", file)
}