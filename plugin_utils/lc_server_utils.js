const request = require('request');
const lcuAuthInfo = require('.././utils/lcu_auth');

console.log(lcuAuthInfo)

function leagueClientGet (lcPluginURL, options = undefined, callback) {
    request.get(`https://riot:${lcuAuthInfo.password}@127.0.0.1:${lcuAuthInfo.port}${lcPluginURL}`, options === undefined ? { rejectUnauthorized: false } : { options, rejectUnauthorized: false }, (err, response, body) => {
        if(callback) {
            callback(err, response, body);
        }
    });
}

const leagueClientPost = function (lcPluginURL, options = undefined, callback) {
    request.post(`https://riot:${lcuAuthInfo.password}@127.0.0.1:${lcuAuthInfo.port}${lcPluginURL}`, options === undefined ? { rejectUnauthorized: false } : { options, rejectUnauthorized: false }, (err, response, body) => {
        if(callback) {
            callback(err, response, body);
        }
    });
}

const leagueClientDelete = function (lcPluginURL, options = undefined, callback) {
    request.delete(`https://riot:${lcuAuthInfo.password}@127.0.0.1:${lcuAuthInfo.port}${lcPluginURL}`, options === undefined ? { rejectUnauthorized: false } : { options, rejectUnauthorized: false }, (err, response, body) => {
        if(callback) {
            callback(err, response, body);
        }
    });
}

const leagueClientPut = function (lcPluginURL, options = undefined, callback) {
    request.put(`https://riot:${lcuAuthInfo.password}@127.0.0.1:${lcuAuthInfo.port}${lcPluginURL}`, options === undefined ? { rejectUnauthorized: false } : { options, rejectUnauthorized: false }, (err, response, body) => {
        if(callback) {
            callback(err, response, body);
        }
    });
}

module.exports = { 
    leagueClientGet: leagueClientGet, 
    leagueClientPost: leagueClientPost, 
    leagueClientDelete: leagueClientDelete, 
    leagueClientPut: leagueClientPut 
}