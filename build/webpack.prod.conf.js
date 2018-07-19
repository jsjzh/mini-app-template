const utils = require("./utils");

module.exports = {
  mode: "production",
  output: {
    filename: "[name].js",
    path: resolve("dist")
  }
}