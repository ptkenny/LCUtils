'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import PassivePlugin from './passive_plugin';
import ActivePlugin from './active_plugin';

const center_style = {
	display: 'flex',
	justifyContent: 'center',
};

class PluginPanel extends React.Component {
	constructor(props) {
		super(props);
		// By default, open the passive plugin settings.
		this.state = { active_panel: 'ACTIVE' };
    }
    
    _openPassivePluginSettings() {
        if(this.state.active_panel === "PASSIVE") return;
        this.setState({
            active_panel: 'PASSIVE'
        });
    }

    _openActivePluginSettings() {
        if(this.state.active_panel === "ACTIVE") return;
        this.setState({
            active_panel: 'ACTIVE'
        });
    }

	render() {
		return (
			<div id="panel_and_buttons">
				<div id="passive_active_buttons" style={center_style}>
					<ButtonGroup>
						<Button bsStyle="primary" id="passive_button" onClick={this._openPassivePluginSettings.bind(this)}>
							Passive Plugin Settings
						</Button>
						<Button bsStyle="primary" id="active_button" onClick={this._openActivePluginSettings.bind(this)}>
							Active Plugin Settings
						</Button>
					</ButtonGroup>
				</div>
                <div id="plugin_panel">
                    {
                        this.props.plugins.map( plugin => {
                            if(plugin.PLUGIN_TYPE === this.state.active_panel) {
                                return plugin.PLUGIN_TYPE === "PASSIVE" ? <PassivePlugin key={plugin.name} plugin={plugin} /> : <ActivePlugin key={plugin.name} plugin={plugin} />;
							}
                        })
                    }
				</div>
			</div>
		)
	}
}

PluginPanel.propTypes = {
	plugins: PropTypes.array,
};

PluginPanel.defaultProps = {
	plugins: [],
};

module.exports = PluginPanel;
