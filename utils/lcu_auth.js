const fs = require('fs');
let parts = fs.readFileSync("C:\\Riot Games\\League of Legends\\lockfile", "utf8").split(':');
module.exports = { password: parts[3], port: parts[2] }