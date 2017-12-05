function AcceptQueue() {}

AcceptQueue.prototype.description = "Automatically accepts queues so you can tip your pizza delivery driver.";
AcceptQueue.prototype.version = "1.0.0";
AcceptQueue.prototype.author = "didey";
AcceptQueue.prototype.triggerURI = "/lol-lobby-team-builder/v1/lobby/countdown";
AcceptQueue.prototype.onTrigger = function(utilData) {
    
}

module.exports = AcceptQueue;