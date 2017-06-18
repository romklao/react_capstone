import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router';

import App from './app';
import SignupModal from './signup-modal';

export function Routes(props) {
    return (
        <Router history={hashHistory}>
            <Route path="/" components={App} >
                
            </Route>
        </Router>
    );
};

export default connect()(Routes);
