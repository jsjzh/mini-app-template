let dom = document.getElementById("app");

let colorArr = ["red", "green", "blue"];

let timer = setInterval(() => {
  dom.style.color = colorArr[~~(Math.random() * colorArr.length)];
}, 500)

console.log("Hello");


// if (module.hot) {
//   module.hot.accept();
// }