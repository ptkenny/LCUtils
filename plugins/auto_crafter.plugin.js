'use babel';

import Controls from '../plugin_components/auto_crafter';

const logger = require('winston');
const client_utils = require("../plugin_utils/lc_server_utils");

const AutoCrafter = {}

AutoCrafter.name = "Auto Crafter";
AutoCrafter.description = "Simplifies the annoying parts of loot management.";
AutoCrafter.version = "1.0.0";
AutoCrafter.author = "didey";
AutoCrafter.PLUGIN_TYPE = "ACTIVE";
AutoCrafter.controls = Controls;

AutoCrafter.craftKeysAndOpenChests = function() {
    logger.info("Crafting keys and opening chests");
    client_utils.leagueClientGet("/lol-loot/v1/player-loot", {}, (err, response, body) => {
        if(err) logger.error(err);
        let playerLoot = JSON.parse(body);

        let keyFragmentMaterial = playerLoot.find(lootItem => lootItem.lootName === "MATERIAL_key_fragment");
        console.log("KEY FRAGMENT MATERIAL: ", keyFragmentMaterial);
        let levelUpChestMaterial = playerLoot.find(lootItem => lootItem.lootName === "CHEST_128");
        console.log("LEVELUP CHEST MATERIAL: ", levelUpChestMaterial)
        let chestMaterial = playerLoot.find(lootItem => lootItem.lootName === "CHEST_champion_mastery");
        console.log("NORMAL CHEST MATERIAL: ", chestMaterial);

        if(keyFragmentMaterial === undefined) {
            keyFragmentMaterial = { count: 0 };
        }
        if(levelUpChestMaterial === undefined) {
            levelUpChestMaterial = { count : 0 };
        }
        if(chestMaterial === undefined) {
            chestMaterial = { count: 0 };
        }

        let keyRepeat = Math.floor(keyFragmentMaterial.count / 3);

        let keyCraftOptions = {
            body: '[ "MATERIAL_key_fragment" ]'
        };

        client_utils.leagueClientPost(`/lol-loot/v1/recipes/MATERIAL_key_fragment_forge/craft?repeat=${keyRepeat}`, keyCraftOptions, (err, response, body) => {
            if(err) return logger.error(err);
            console.log("KEY BODY: " + body);
            
            let keyMaterial = playerLoot.find(lootItem => lootItem.lootName === "MATERIAL_key");
            let keyCount = keyMaterial === undefined ? 0 : keyMaterial.count;
            
            let chestOptions = {
                body: '[ "CHEST_champion_mastery" ]'
            };

            client_utils.leagueClientPost(`/lol-loot/v1/recipes/CHEST_champion_mastery_OPEN/craft?repeat=${ keyCount >= chestMaterial.count ? chestMaterial.count : keyCount }`, chestOptions, (err, response, body) => {
                if(err) return logger.error(err);
                console.log("REGULAR CHEST BODY: " + body);
                // Now we disenchant all champ shards.

            });
        });

        let levelUpChestOptions = {
            body: '[ "CHEST_128" ]'
        };

        client_utils.leagueClientPost(`/lol-loot/v1/recipes/CHEST_128_OPEN/craft?repeat=${levelUpChestMaterial.count}`, levelUpChestOptions, (err, response, body) => {
            if(err) return logger.error(body);
            console.log("LEVELUP CHEST BODY: " + body)
        });
    });
};

module.exports = AutoCrafter;