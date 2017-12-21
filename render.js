import React from 'react';
import ReactDOM from 'react-dom';
import PassivePluginPanel from './components/passsive_plugin_panel'

const render = plugins => {
    window.onload = () => {
        ReactDOM.render(<PassivePluginPanel plugins={plugins} />, document.getElementById("content"));
    }    
}

module.exports = { render: render };