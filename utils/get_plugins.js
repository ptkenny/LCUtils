const fs = require('fs')

function getPlugins() {
    let plugins = [];

    let pluginFiles = fs.readdirSync("./plugins/", { encoding: 'utf8'});

    console.log(pluginFiles);

    pluginFiles.forEach( (file) => {
        if(file.substr(file.length - 10, file.length) === ".plugin.js") {
            plugins.push(require("../plugins/" + file));
        } else {
            console.error(`File ${file} in /plugins is not a plugin file!`);
        }
    });

    return plugins;
}

module.exports = getPlugins();