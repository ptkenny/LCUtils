const AcceptQueue = {}

const client_utils = require("../plugin_utils/lc_server_utils");
const logger = require('winston');

AcceptQueue.name = "Auto Accept Queue";
AcceptQueue.description = "Automatically accepts queues so you can tip your pizza delivery driver.";
AcceptQueue.version = "1.0.0";
AcceptQueue.author = "didey";
AcceptQueue.PLUGIN_TYPE = "PASSIVE";
AcceptQueue.triggerURI = "/lol-matchmaking/v1/ready-check";
AcceptQueue.onTrigger = (utilData, trigger) => {
    if(!utilData.data) return;
    if(utilData.data.playerResponse === "None") {
        client_utils.leagueClientPost("/lol-matchmaking/v1/ready-check/accept", {}, (err, response, body) => {
            if(err) logger.error(err.message);
            logger.info("Automatically accepted queue");
        });
    }
}

module.exports = AcceptQueue;