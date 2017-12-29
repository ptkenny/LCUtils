const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const jsonFile = require('jsonfile')
const settingsPath = './pluginsettings.json'
const fs = require('fs')

let mainWindow

// Global is justified here. Disagree? Email me.
global.plugins = require('./utils/get_plugins');

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.toggleDevTools();

  mainWindow.loadURL(url.format({
    
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.setAppUserModelId("lcutils");

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


app.on('quit', () => {
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