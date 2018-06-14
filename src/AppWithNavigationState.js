import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import SwitchRouters from './routers/SwitchRouters';
import { addListener } from './utils/redux';

class AppWithNavigationState extends Component {

    render() {
        const { dispatch,nav } = this.props;
        return (
            <SwitchRouters navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: nav,
                addListener
            })}
            />
        );

    }
}

function mapStateToProps(state) {
    const {nav} = state;
    return {
        nav
    }
}

export default connect(mapStateToProps)(AppWithNavigationState);
