import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index'

export function LoginSignup(props) {
    var showLogin = event => {
        event.preventDefault();
        props.dispatch(actions.showLogin());        
    };

    var showSignup = event => {
        event.preventDefault();
        props.dispatch(actions.showSignup());        
    };

    return (
        <ul className="nav navbar-nav navbar-right">
            <li><a href="#" onClick={showLogin}>Log In</a></li>
            <li><a href="#" onClick={showSignup}>Sign Up</a></li>
        </ul>
    );
}

export default connect()(LoginSignup);