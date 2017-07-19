require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router';

import store from './store';
import Routes from './components/routes';
import LandingPageContainer from './components/LandingPageContainer';


document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
        <Provider store={store}>
            <Routes />
        </Provider>,
        document.getElementById('app')
    )
);

