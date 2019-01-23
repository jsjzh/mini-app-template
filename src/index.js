// 在 webpack.config.js 中配置了 alias
// 会自动解析 static 为 webpack.config.js 目录下的 utils.resolve("static")
import 'static/css/normalize.css'
import 'static/css/reset.css'
import 'static/css/github-markdown.css'
import './index.scss'

const app = document.getElementById('app')
app.innerHTML = require('./index.html')
// -------------
// 开始写项目代码

// -------------
if (module.hot) {
  module.hot.accept()
}
