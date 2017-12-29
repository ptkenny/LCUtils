const MessageNotifier = {}

const client_utils = require("../plugin_utils/lc_server_utils");
const logger = require('winston');
const platform = require('os').platform();
const notifier = require('../utils/toast_notifier');

MessageNotifier.name = "Desktop Message Notifier";
MessageNotifier.description = "Uses the default notification method of a given platform to relay messages.";
MessageNotifier.version = "1.0.0";
MessageNotifier.author = "didey";
MessageNotifier.PLUGIN_TYPE = "PASSIVE";
MessageNotifier.triggerURI = "/lol-chat/v1/conversations";
MessageNotifier.onTrigger = (utilData, trigger) => {
    // The client sends out two events when a chat is received, and the event that has 
    // "utilData.data.body" holds less info, so I filter that one out.

    if(utilData.eventType !== "Create" || utilData.data.type === "system") return;

    console.log(utilData);

    // I can't use electron's notification system due to Windows 10 Creator's Edition,
    // which broke every nodeJS Windows notification library. 
    client_utils.leagueClientGet(`/lol-chat/v1/friends/${utilData.data.fromId}`, {}, (err, response, body) => {
        let jsonBody = JSON.parse(body);
        let iconID = jsonBody.icon;
        let senderName = jsonBody.name;

        // Used on OSX/Windows, using GNU/Linux will cause an error,
        // unless Wine can detect toast notifications and convert them(not sure).
        if(platform === "darwin") {
            let notification = new Notification(`Message from ${senderName}`, {
                body: utilData.data.body
            });

            notification.onclick = () => {
                notificationClicked();
            };
        } else {
            notifier.toast_notify(`Message from ${senderName}`, utilData.data.body).then((code) => {
                // If SnoreToast returns 0, that means the notification was clicked, documented here:
                // https://github.com/KDE/snoretoast
                if(code === 0) notificationClicked();
            });
        }

    });
}

const notificationClicked = function() {
    client_utils.leagueClientPost("/riotclient/ux-show");
    logger.info(`User clicked on message notification`);
}

module.exports = MessageNotifier;