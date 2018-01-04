const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const path = require('path')
const url = require('url')
const jsonFile = require('jsonfile')

let mainWindow

let plugins

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  if(process.env.NODE_ENV !== "development") {
    process.chdir('./resources/app');
  } else {
    mainWindow.toggleDevTools();
  }

  mainWindow.loadURL(url.format({
    
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

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

app.on('close', function () {
  let enabledExport = { PLUGIN_STATES: {} };
	plugins.forEach(plugin => {
		enabledExport['PLUGIN_STATES'][plugin.name] = plugin.isEnabled;
	});
	jsonFile.writeFile(settingsPath, enabledExport, { spaces: 2 }, err => {
		if (err) console.log(err);
	});
})


ipcMain.on('plugins-loaded', (event, data) => {
  plugins = data;
})