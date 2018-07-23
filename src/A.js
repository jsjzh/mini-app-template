let dom = document.getElementById("app");
let colorArr = ["red", "green", "blue"];
// let timer = setInterval(() => {
//   dom.style.color = colorArr[~~(Math.random() * colorArr.length)];
// }, 500)

let timer = setTimeout(() => {
let image = require("../static/image/cursor.png")
  let imageDom = document.getElementById("image_data-url");
  imageDom.src = image;
}, 1000)

// if (module.hot) {
//   module.hot.accept();
// }