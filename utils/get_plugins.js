const fs = require('fs')

function getPlugins() {
    let plugins = [];

    let pluginFiles = fs.readdirSync("./plugins/", { encoding: 'utf8'});

    for(file of pluginFiles) {
        if(file.substr(file.length - 10, file.length) === ".plugin.js") {
            plugins.push(require("../plugins/" + file));
        } else {
            console.error(`File ${file} in /plugins is not a JS file!`);
        }
    }
    return plugins;
}

module.exports = getPlugins();