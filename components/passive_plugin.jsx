'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class PassivePlugin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_plugin_active: this.props.plugin.isEnabled
        };
    }

    _toggleEnabled() {
        this.setState({
            is_plugin_active: !this.state.is_plugin_active
        }, () => {
            this.props.plugin.isEnabled = this.state.is_plugin_active;
        });
    }

    render() {
        return ( 
            <div id={this.props.plugin.name + "_div"} className="plugin_div">
                <p className="name_and_version">{this.props.plugin.name} - {this.props.plugin.version}</p>
                <p className="description">{this.props.plugin.description}</p>
                <p className="author">{this.props.plugin.author}</p>
                <Button bsStyle={this.state.is_plugin_active === true ? "primary" : "danger"} onClick={this._toggleEnabled.bind(this)}>
                    {this.state.is_plugin_active === true ? "Enabled" : "Disabled"}
                </Button>
                <hr></hr>
            </div>
        );
    }

}

PassivePlugin.propTypes = {
    plugin: PropTypes.object
}

module.exports = PassivePlugin;