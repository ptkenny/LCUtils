const remote = require('electron').remote;
const jsonFile = require('jsonfile')
const settingsPath = './pluginsettings.json'
const fs = require('fs')

global.plugins = require('./utils/get_plugins');

require('./render').render(global.plugins);
require('./utils/manage_socket').initSocketHandler(global.plugins);

remote.getCurrentWindow().on('closed', () => {
    let enabledExport = {
        PLUGIN_STATES: {}
    };
    global.plugins.forEach(plugin => {
        enabledExport["PLUGIN_STATES"][plugin.name] = plugin.isEnabled;
    });
    jsonFile.writeFile(settingsPath, enabledExport, { spaces: 2 }, (err) => {
        if(err) console.log(err);
    });
});