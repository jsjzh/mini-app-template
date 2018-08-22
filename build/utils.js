const path = require("path");
const os = require("os");
const packageConfig = require('../package.json');

exports.resolve = function (dir) {
    return path.join(__dirname, "..", dir)
}

exports.getIPAdress = function () {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
                return alias.address;
            }
        }
    }
}

exports.createNotifierCallback = function () {
    var notifier = require('node-notifier')
    return (severity, errors) => {
        if (severity !== 'error') return
        var error = errors[0]
        var filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || ''
        })
    }
}

exports.assetsPath = function (_path) {
    return path.posix.join("static", _path)
}