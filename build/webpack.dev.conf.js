var utils = require("./utils");

class MyPlugin {
  constructor(options) {

  }
  apply(compiler) {
    console.log("success");
  }
}

module.exports = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: utils.resolve("dist"),
    publicPath: "/"
  },
  plugins: [
    new MyPlugin()
  ]
}