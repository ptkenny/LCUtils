const fs = require('fs');
const jsonFile = require('jsonfile');

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

    let pluginSettings = jsonFile.readFileSync('./pluginsettings.json');

    // In the future, save this to a config file of some sort and load it here.
    plugins.forEach(plugin => {
        if(pluginSettings.PLUGIN_STATES[plugin.name] === undefined) return;
        plugin.isEnabled = pluginSettings.PLUGIN_STATES[plugin.name];
    });

    return plugins;
}

module.exports = getPlugins();