import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/createStore';
import AppWithNavigationState from './AppWithNavigationState';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { middleware } from './utils/redux';


export default class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
};
