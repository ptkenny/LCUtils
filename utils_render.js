const WebSocketClient = require('websocket').client;
const lcuAuthInfo = require('./lcu_auth.js');


let test = require('./get_plugins.js')

let leagueWsClient = new WebSocketClient( {
    tlsOptions: {
        rejectUnauthorized: false,
        auth: `riot:${lcuAuthInfo.password}`,
    }
});

console.log(lcuAuthInfo);

// TODO: Add an error message or something to the window.
leagueWsClient.on('connectFailed', (error) => {
    console.log(error.toString())
});

leagueWsClient.on('connect', (connection) => {
    console.log("this looks like a job for me")
    // Tells the client to send me all JSON API event information. 
    // Thanks to molenzwiebel, who made the project(Mimic) I found this snippet in.
    connection.send("[5,\"OnJsonApiEvent\"]");
    
    connection.on('error', (error) => {
        console.log(error.toString());
    });

    connection.on('close', () => {
        console.log("closed");
    });
    
    connection.on('message', (message) => {
        // Make sure the message is a string, and also make sure that it isn't blank(for some reason, the LCU always sends a blank message first...).
        if(message.type != 'utf8' || message.utf8Data === "") return;
        handleMessage(message);
    });
});

function handleMessage(message) {
    let parsedData = JSON.parse(message.utf8Data);
}

leagueWsClient.connect(`wss://127.0.0.1:${lcuAuthInfo.port}/`);