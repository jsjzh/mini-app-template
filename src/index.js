let dom = document.getElementById("app");

dom.style.color = "red";

console.log(module);

if (module.hot) {
  module.hot.accept();
}