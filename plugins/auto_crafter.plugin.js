import Controls from '../plugin_components/auto_crafter.jsx';

const logger = require('../utils/configure_log');
const client_utils = require("../plugin_utils/lc_server_utils");

const AutoCrafter = {}

AutoCrafter.name = "Auto Crafter";
AutoCrafter.description = "Simplifies the annoying parts of loot management.";
AutoCrafter.version = "1.0.0";
AutoCrafter.author = "didey";
AutoCrafter.PLUGIN_TYPE = "ACTIVE";
AutoCrafter.controls = Controls;

AutoCrafter.disenchantChampShards = function() {
    logger.info("Disenchanting champion shards...");
    client_utils.leagueClientGet("/lol-loot/v1/player-loot", {}, (err, response, body) => {
        if(err) return logger.error(err);
        let playerLoot = JSON.parse(body);

        let champShards = playerLoot.filter(lootItem => lootItem.disenchantLootName === "CURRENCY_champion");

        champShards.forEach( champShard => {
            let disenchantOptions = {
                body: `["${champShard.lootId}"]`
            }

            client_utils.leagueClientPost(`/lol-loot/v1/recipes/CHAMPION_RENTAL_disenchant/craft?repeat=${champShard.count}`, disenchantOptions, (err, response, body) => {
                if(err) return logger.error(err);
                logger.info("All champion shards disenchanted.");
            });
        });
    });
}

AutoCrafter.craftKeysAndOpenChests = function() {
    logger.info("Crafting keys and opening chests...");
    client_utils.leagueClientGet("/lol-loot/v1/player-loot", {}, (err, response, body) => {
        if(err) return logger.error(err);
        let playerLoot = JSON.parse(body);

        let keyFragmentMaterial = playerLoot.find(lootItem => lootItem.lootName === "MATERIAL_key_fragment");
        let levelUpChestMaterial = playerLoot.find(lootItem => lootItem.lootName === "CHEST_128");
        let chestMaterial = playerLoot.find(lootItem => lootItem.lootName === "CHEST_generic");

        // Set count to 0 here so we don't get an error later, except for the internal error(just indicating that repeat=0).
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

        logger.info("Crafting keys from fragments...");

        client_utils.leagueClientPost(`/lol-loot/v1/recipes/MATERIAL_key_fragment_forge/craft?repeat=${keyRepeat}`, keyCraftOptions, (err, response, body) => {
            if(err) return logger.error(err);
            logger.info("Keys forged.");

            let keyMaterial = playerLoot.find(lootItem => lootItem.lootName === "MATERIAL_key");
            let keyCount = keyMaterial === undefined ? 0 : keyMaterial.count;
            
            let chestOptions = {
                body: '[ "CHEST_generic", "MATERIAL_key" ]'
            };
            
            logger.info("Opening chests...");
            client_utils.leagueClientPost(`/lol-loot/v1/recipes/CHEST_generic_OPEN/craft?repeat=${ keyCount >= chestMaterial.count ? chestMaterial.count : keyCount }`, chestOptions, (err, response, body) => {
                if(err) return logger.error(err);
                logger.info("Chests opened.");
            });
        });

        let levelUpChestOptions = {
            body: '[ "CHEST_128" ]'
        };

        logger.info("Opening levelup chests...");
        client_utils.leagueClientPost(`/lol-loot/v1/recipes/CHEST_128_OPEN/craft?repeat=${levelUpChestMaterial.count}`, levelUpChestOptions, (err, response, body) => {
            if(err) return logger.error(err);
            logger.info("Levelup chests opened.");
        });
    });
}; 

module.exports = AutoCrafter;