import Controls from '../plugin_components/invite_all.jsx';

const logger = require('../utils/configure_log');
const client_utils = require("../plugin_utils/lc_server_utils");

const InviteAll = {}

InviteAll.name = "Invite All";
InviteAll.description = "Allows for inviting of large groups of players for when you can't find that fifth player to fill your lobby.";
InviteAll.version = "1.0.0";
InviteAll.author = "didey";
InviteAll.PLUGIN_TYPE = "ACTIVE";
InviteAll.controls = Controls;

// These two functions are different enough to make it inconvenient to combine them into one seperate function, so I won't.
// If you want to, go ahead and send a PR.

InviteAll.inviteAllFriends = function() {
    logger.info("Attempting to invite all friends...");
    client_utils.leagueClientGet("/lol-chat/v1/friends", {}, (err, response, body) => {
        let friendList = JSON.parse(body);
        let availableFriendsList = friendList.filter(friend => friend.availability !== "offline" && friend.availability !== "mobile" && friend.availability !== "dnd");
        let invitationList = [];
        
        availableFriendsList.forEach(friend => {
            invitationList.push({
                invitationId: "",
                state: "Requested",
                timestamp: "0",
                toSummonerId: friend.id
            });
        });

        let invitationRequest = {
            body: `${JSON.stringify(invitationList)}`
        };

        invitePlayers(invitationRequest);
    });
}

InviteAll.inviteAllRecent = function() {
    logger.info("Attemptiong to invite all recently played summoners...");
    client_utils.leagueClientGet("/lol-match-history/v1/recently-played-summoners", {}, (err, response, body) => {
        if(err) logger.error(err);
        let recentlyPlayedPlayers = JSON.parse(body);
        let invitationList = [];

        recentlyPlayedPlayers.forEach(player => {
            invitationList.push({
                invitationId: "",
                state: "Requested",
                timestamp: "0",
                toSummonerId: player.summonerId
            })
        });

        let invitationRequest = {
            body: `${JSON.stringify(invitationList)}`
        };

        invitePlayers(invitationRequest);
    });
}

const invitePlayers = (invitationRequest) => {
    client_utils.leagueClientPost("/lol-lobby/v2/lobby/invitations", invitationRequest, (err, response, body) => {
        if(err) logger.error(err);
        logger.info("Invitation request complete.");
    });
}; 

module.exports = InviteAll;