// node 模块 path
var path = require('path')
// 加载动画小圈圈
var ora = require('ora')
// 删除文件专用
var rm = require('rimraf')
// 在控制台打出有颜色的文字所需要
var chalk = require('chalk')

var spinner = ora('正在构建项目中...\n')
spinner.start()

setTimeout(() => {
  rm(path.resolve(__dirname, '../', "dist"), (err) => {
    if (err) throw err
    console.log(chalk.red('两秒过去了...\n'))
    spinner.stop()
  })
}, 2000);

// /*1:声明变量*/
// var num1, num2;
// /*2：向屏幕输出，提示信息，要求输入num1*/
// process.stdout.write('请输入num1的值：');
// /*3：监听用户的输入*/
// process.stdin.on('data', function (chunk) {
//   if (!num1) {
//     num1 = Number(chunk);
//     /*4：向屏幕输出，提示信息，要求输入num2*/
//     process.stdout.write('请输入num2的值');
//   } else {
//     num2 = Number(chunk);
//     process.stdout.write('结果是：' + (num1 + num2));
//   }
// });