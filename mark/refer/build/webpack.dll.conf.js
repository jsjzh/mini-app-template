const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['vue', 'vuex', 'vue-router', 'vue-i18n', 'element-ui', 'leaflet']
  },
  output: {
    path: path.join(__dirname, '../static/dll'),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
}
