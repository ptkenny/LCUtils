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
MessageNotifier.triggerURI = "/lol-game-client-chat/v1/instant-messages";
MessageNotifier.onTrigger = (utilData, trigger) => {

    const senderName = utilData.data.fromSummonerName;
    const messageBody = utilData.data.body;

    logger.info("Sending notification to user...");

    // Used on OSX/Windows, using GNU/Linux will cause an error,
    // unless Wine can detect toast notifications and convert them(not sure).
    if (platform === "darwin") {
        let notification = new Notification(`Message from ${senderName}`, {
            body: messageBody
        });

        notification.onclick = () => {
            notificationClicked();
        };
    } else {
        notifier.toast_notify(`Message from ${senderName}`, messageBody).then((code) => {
            // If SnoreToast returns 0, that means the notification was clicked, documented here:
            // https://github.com/KDE/snoretoast
            logger.info(`SnoreToast exited with code ${code}`);
            if (code === 0) notificationClicked();
        });
    }
}

const notificationClicked = function () {
    client_utils.leagueClientPost("/riotclient/ux-show");
    logger.info(`User clicked on message notification`);
}

module.exports = MessageNotifier;