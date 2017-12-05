const fs = require('fs')

function getPlugins() {
    let plugins = [];

    let pluginFiles = fs.readdirSync("./plugins/", { encoding: 'utf8'});

    for(file of pluginFiles) {
        if(file.substr(0, file.length - 3) !== ".js") {
            plugins.push(require("./plugins/" + file));
        } else {
            console.error(`File ${file} in /plugins is not a JS file!`);
        }
    }

    console.log(plugins);
}

module.exports = getPlugins();