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

    // In the future, save this to a config file of some sort and load it here.
    plugins.forEach(plugin => {
        plugin.isEnabled = true;
    });

    return plugins;
}

module.exports = getPlugins();