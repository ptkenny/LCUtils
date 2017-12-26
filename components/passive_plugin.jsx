'use babel';

import React from 'react';
import PropTypes from 'prop-types';

class PassivePlugin extends React.Component {

    render() {
        return ( 
            <div id={this.props.plugin.name + "_div"} class="plugin_div">
                <p class="name_and_version">{this.props.plugin.name} - {this.props.plugin.version}</p>
                <p class="description">{this.props.plugin.description}</p>
                <p class="author">{this.props.plugin.author}</p>
                <hr></hr>
            </div>
        );
    }

}

PassivePlugin.propTypes = {
    plugin: PropTypes.object
}

module.exports = PassivePlugin;