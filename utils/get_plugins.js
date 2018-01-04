const fs = require('fs');
const jsonFile = require('jsonfile');

function getPlugins() {
    let plugins = [];

    let pluginFiles = fs.readdirSync("./plugins/", { encoding: 'utf8'});

    pluginFiles.forEach( (file) => {
        if(file.substr(file.length - 10, file.length) === ".plugin.js") {
            plugins.push(require("../plugins/" + file));
        } else {
            console.error(`File ${file} in /plugins is not a plugin file!`);
        }
    });

    if(fs.existsSync('./pluginsettings.json')) {
        let pluginSettings = jsonFile.readFileSync('./pluginsettings.json');
    
        plugins.forEach(plugin => {
            if(pluginSettings.PLUGIN_STATES[plugin.name] === undefined) return;
            plugin.isEnabled = pluginSettings.PLUGIN_STATES[plugin.name];
        });
    } else {
        plugins.forEach(plugin => {
            plugin.isEnabled = true;
        });
    }

    return plugins;
}

module.exports = getPlugins();