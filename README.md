# my-webpack-template

## mark

entry: { app: "src/main.js" }
error
webpack4 默认 entry 为 src/index.js

webpack  --config path 指定 config 路径地址

webpack-dev-server --inline
HMR

https://www.cnblogs.com/wangpenghui522/p/6826182.html
https://segmentfault.com/q/1010000011431180
https://segmentfault.com/a/1190000011761345
https://segmentfault.com/a/1190000011761306
http://www.lixuejiang.me/2017/11/05/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%E5%B0%8F%E7%BB%93/

webpack-dev-middleware
https://www.npmjs.com/package/webpack-dev-middleware
配合 express 和 webpack-hot-milldeware 进行开发，可以将编译后的文件写入内存进行调试。
值得注意的是这个中间件执行的是编译而不是重载，需要配合 webapck-hot-middleware 才可以进行浏览器重载。

connect-history-api-fallback
https://segmentfault.com/a/1190000007890379
该中间件是针对单页面应用（SPA）使用的。想想这样的场景，入口为 index.html，在浏览器地址为 www.mydomain.com，当使用 html5 中的 history 模式（比如 vue-router 中开启 history 模式）进行单页面中页面的跳转，跳转到 www.mydomain.com/list，页面，这个时候，如果进行了刷新操作，这个时候服务器就会去找寻 www.mydomain.com/list 的资源，但其实我们只是用了 history 进行页面导航而已，服务器并没有这个资源。