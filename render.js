import React from 'react';
import ReactDOM from 'react-dom';
import PluginPanel from './components/plugin_panel';

const logger = require('./utils/configure_log');
const lcuAuthInfo = require('./utils/lcu_auth');
const client_utils = require('./plugin_utils/lc_server_utils');
const request = require("request");

const render = plugins => {
    window.onload = () => {
        request.get("https://ddragon.leagueoflegends.com/api/versions.json", {}, (err, response, body) => {
            if(err) logger.info(err);
            let ddragonVersion = JSON.parse(body)[0];
            client_utils.leagueClientGet('/lol-chat/v1/me', {}, (err, response, body) => {
                if(err) logger.error(err);
                let userInfo = JSON.parse(body);
                document.getElementById("user_name").innerHTML = `${userInfo.name}`;
                document.getElementById("user_icon").src = `http://ddragon.leagueoflegends.com/cdn/${ddragonVersion === undefined ? "7.24.2" : ddragonVersion}/img/profileicon/${userInfo.icon}.png`
            });
        });
        
        ReactDOM.render(<PluginPanel plugins={plugins} />, document.getElementById("content"));
    }    
}

module.exports = { render: render };