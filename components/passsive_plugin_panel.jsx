'use babel';

import React from 'react';
import PassivePlugin from './passive_plugin';
import PropTypes from 'prop-types';

class PassivePluginPanel extends React.Component {

    render() {
        return (
            <div>
            {
                this.props.plugins.map( plugin => {
                    return <PassivePlugin key={plugin.name} plugin={plugin} />;
                })
            }
            </div>
        );
    }

}

// Very hacky, too lazy to look up the proper way to do it.
PassivePluginPanel.propTypes = {
    plugins: PropTypes.array
};

PassivePluginPanel.defaultProps = {
    plugins: [{}]
};

module.exports = PassivePluginPanel;