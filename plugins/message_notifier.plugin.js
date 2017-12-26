const MessageNotifier = {}

const client_utils = require("../plugin_utils/lc_server_utils");
const logger = require('winston');

MessageNotifier.name = "Desktop Message Notifier";
MessageNotifier.description = "Uses the default notification method of a given platform to relay messages.";
MessageNotifier.version = "1.0.0";
MessageNotifier.author = "didey";
MessageNotifier.PLUGIN_TYPE = "PASSIVE";
MessageNotifier.triggerURI = "/lol-chat/v1/conversations";
MessageNotifier.onTrigger = (utilData, trigger) => {
    // The client sends out two events when a chat is received, and the event that has 
    // "utilData.data.body" holds less info, so I filter that one out.
    if(utilData.data === null || utilData.data.type !== "chat" || utilData.data.body || utilData.data.unreadMessageCount === 0) return; 

    let notification = new Notification(`${utilData.data.name} | League of Legends`, {
        body: utilData.data.lastMessage.body,
        icon: "./snoretoast/logo.png"
    });

    notification.onclick = () => {
        client_utils.leagueClientPost("/riotclient/league-ux/show");
    };

}

module.exports = MessageNotifier;