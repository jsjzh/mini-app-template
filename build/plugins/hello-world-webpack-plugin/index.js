class HelloWorldPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // compiler是什么？compiler是webpack的'编译器'引用
    // compiler.plugin('***')和compilation.plugin('***')代表什么？
    // document.addEventListener熟悉吧？其实是类似的
    // compiler.plugin('***')就相当于给compiler设置了事件监听
    // 所以compiler.plugin('compile')就代表：当编译器监听到compile事件时，我们应该做些什么
    // compile（'编译器'对'开始编译'这个事件的监听）
    compiler.plugin("compile", function (params) {
      console.log("The compiler is starting to compile...");
    });
    // compilation（'编译器'对'编译ing'这个事件的监听）
    compiler.plugin("compilation", function (compilation) {
      console.log("The compiler is starting a new compilation...");
      // 在compilation事件监听中，我们可以访问compilation引用，它是一个代表编译过程的对象引用
      // 我们一定要区分compiler和compilation，一个代表编译器实体，另一个代表编译过程
      // optimize('编译过程'对'优化文件'这个事件的监听)
      compilation.plugin("optimize", function () {
        console.log("The compilation is starting to optimize files...");
      });
    });
    // emit（'编译器'对'生成最终资源'这个事件的监听）
    compiler.plugin("emit", function (compilation, callback) {
      console.log("The compilation is going to emit files...");
      // compilation.chunks是块的集合（构建后将要输出的文件，即编译之后得到的结果）
      compilation.chunks.forEach(function (chunk) {
        // chunk.modules是模块的集合（构建时webpack梳理出的依赖，即import、require的module）
        // 形象一点说：chunk.modules是原材料，下面的chunk.files才是最终的成品
        chunk.modules.forEach(function (module) {
          // module.fileDependencies就是具体的文件，最真实的资源【举例，在css中@import("reset.css")，这里的reset.css就是fileDependencie】
          module.fileDependencies.forEach(function (filepath) {
            // 到这一步，就可以操作源文件了
          });
        });
        // 最终生成的文件的集合
        chunk.files.forEach(function (filename) {
          // source()可以得到每个文件的源码
          var source = compilation.assets[filename].source();
        });
      });
      // callback在最后必须调用
      callback();
    });
  };
}

module.exports = HelloWorldPlugin;