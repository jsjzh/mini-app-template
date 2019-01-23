'use strict'
require('./check-versions')()

console.log(process.env.NODE_ENV)

const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const webpack = require('webpack')

const spinner = ora(`(ﾟДﾟ≡ﾟдﾟ)!? building for ${process.env.NODE_ENV} environment...`)
spinner.start()

setTimeout(() => {
  spinner.stop()
}, 4000)
