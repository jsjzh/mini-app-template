'use strict'
require('./check-versions')()

const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora(`building for ${process.env.NODE_ENV} environment...`)

spinner.start()

rm(config.build.assetsRoot, webpackPackage)

function webpackPackage(err) {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('(ﾟДﾟ≡ﾟдﾟ)!? Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('Build complete.\n'))
  })
}
