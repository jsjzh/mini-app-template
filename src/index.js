import "static/css/normalize.css";

import * as index from "./index.html";
import "./index.css";

console.log(index);

const app = document.getElementById("app");
app.innerHTML = index;

if (module.hot) {
  module.hot.accept();
}