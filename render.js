import React from 'react';
import ReactDOM from 'react-dom';
import PluginPanel from './components/plugin_panel';

const render = plugins => {
    window.onload = () => {
        ReactDOM.render(<PluginPanel plugins={plugins} />, document.getElementById("content"));
    }    
}

module.exports = { render: render };