function MessageNotifier() {}

const client_utils = require("./plugin_utils/lc_server_utils");
const logger = require('winston');
const notifier = require('../utils/toast_notifier')

MessageNotifier.prototype.description = "Uses the default notification method of a given platform to relay messages.";
MessageNotifier.prototype.version = "1.0.0";
MessageNotifier.prototype.author = "didey";
MessageNotifier.prototype.PLUGIN_TYPE = "PASSIVE";
MessageNotifier.prototype.triggerURI = "/lol-chat/v1/conversations";
MessageNotifier.prototype.onTrigger = (utilData, trigger) => {
    // The client sends out two events when a chat is received, and the event that has 
    // "utilData.data.body" holds less info, so I filter that one out.
    if(utilData.data === null || utilData.data.type !== "chat" || utilData.data.body || utilData.data.unreadMessageCount === 0) return;

    notifier.toast_notify(`Message from ${utilData.data.name}:`, utilData.data.lastMessage.body).then((code) => {
        // If SnoreToast returns 0, that means the notification was clicked, documented here:
        // https://github.com/KDE/snoretoast
        if(code === 0) client_utils.leagueClientPost("/riotclient/ux-show");
    });

    logger.info("Toast notification was sent to the user");

}

module.exports = MessageNotifier;