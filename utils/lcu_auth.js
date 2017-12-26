const fs = require('fs');
const os = require('os');

// User on OSX/Windows(GNU/Linux support to be added someday...)
let parts;
if(os.platform() === "darwin") {
    parts = fs.readFileSync("/Applications/League of Legends.app/Contents/LoL/lockfile", "utf8").split(':');
} else {
    parts = fs.readFileSync("C:\\Riot Games\\League of Legends\\lockfile", "utf8").split(':');
}

module.exports = { password: parts[3], port: parts[2] }