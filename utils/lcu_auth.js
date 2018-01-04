const fs = require('fs');
const os = require('os');
const jsonFile = require('jsonFile');
const { dialog } = require('electron').remote;

let leaguePath;

if(!fs.existsSync("./settings.json")) {
    
    let leagueDirectorySelection = dialog.showOpenDialog({
        title: "Open League of Legends Install Directory",
        properties: [
            "openDirectory"
        ]
    });

    jsonFile.writeFileSync("./settings.json", {
        coreSettings: {
            leagueInstallDir: leagueDirectorySelection[0]
        }
    }, { spaces: 2 });
    leaguePath = leagueDirectorySelection[0];
} else {
    leaguePath = jsonFile.readFileSync("./settings.json", { encoding: "utf8"}).coreSettings.leagueInstallDir;
}


// User on OSX/Windows(GNU/Linux support to be added someday...)
let parts;
if(os.platform() === "darwin") {
    parts = fs.readFileSync(`${leaguePath}/League of Legends.app/Contents/LoL/lockfile`, "utf8").split(':');
} else {
    parts = fs.readFileSync(`${leaguePath}\\lockfile`, "utf8").split(':');
}

module.exports = { password: parts[3], port: parts[2] }