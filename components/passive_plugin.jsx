'use babel';

import React from 'react';
import PropTypes from 'prop-types';

class PassivePlugin extends React.Component {

    render() {
        return ( 
            <p> {this.props.plugin.name} {this.props.plugin.description} {this.props.plugin.version} {this.props.plugin.author} {this.props.plugin.pluginType} </p>
        );
    }

}

PassivePlugin.propTypes = {
    plugin: PropTypes.object
}

module.exports = PassivePlugin;