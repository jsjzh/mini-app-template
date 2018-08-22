import "static/css/normalize.css";
import "./index.scss";

const index = require("./index.html");
const app = document.getElementById("app");
app.innerHTML = index;
// -------------
// 开始写项目代码




// -------------
if (module.hot) {
  module.hot.accept();
}