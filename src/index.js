let dom = document.getElementById("app");

console.log("123");

console.log(module);

if (module.hot) {
  module.hot.accept();
}