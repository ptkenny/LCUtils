function AcceptQueue() {}

const client_utils = require("./plugin_utils/lc_server_utils.js");
const logger = require('winston');

AcceptQueue.prototype.description = "Automatically accepts queues so you can tip your pizza delivery driver.";
AcceptQueue.prototype.version = "1.0.0";
AcceptQueue.prototype.author = "didey";
AcceptQueue.prototype.PLUGIN_TYPE = "PASSIVE";
AcceptQueue.prototype.triggerURI = "/lol-matchmaking/v1/ready-check";
AcceptQueue.prototype.onTrigger = (utilData, trigger) => {
    if(!utilData.data) {
        return;
    }
    if(utilData.data.playerResponse === "None") {
        client_utils.leagueClientPost("/lol-matchmaking/v1/ready-check/accept", {}, (err, response, body) => {
            if(err) logger.error(err.message);
            logger.info("Automatically accepted queue");
        });
    }
}

module.exports = AcceptQueue;