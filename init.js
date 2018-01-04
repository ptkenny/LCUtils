const { ipcRenderer, remote } = require('electron');
const jsonFile = require('jsonfile');
const settingsPath = './pluginsettings.json';
const logger = require('./utils/configure_log');
const fs = require('fs')

global.plugins = require('./utils/get_plugins');

require('./render').render(global.plugins);
require('./utils/manage_socket').initSocketHandler(global.plugins);

ipcRenderer.send('plugins-loaded', global.plugins);

