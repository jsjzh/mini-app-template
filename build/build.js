'use strict'
require('./check-versions')()

const argv = require('yargs').argv
const env = argv.env

process.env.NODE_ENV = env
