import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index'

class LoginSignup extends React.Component {
    constructor(props) {
        super(props);
        this.showLogin = this.showLogin.bind(this);
        this.showSignup = this.showSignup.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }
    showLogin(event) {
        event.preventDefault();
        this.props.dispatch(actions.showLogin());
    }

    showSignup(event) {
        event.preventDefault();
        this.props.dispatch(actions.showSignup());
    }

    logoutUser (event) {
        event.preventDefault();
        this.props.dispatch(actions.logout());
    }

    render() {
        if (this.props.authenticated) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={this.logoutUser}>Log Out</a></li>
                </ul>
            );
        } 
        if (!this.props.authenticated) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={this.showLogin}>Log In</a></li>
                    <li><a href="#" onClick={this.showSignup}>Sign Up</a></li>
                </ul>
            );
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        authenticated: localStorage.authHeaders,
    }
}
export default connect(mapStateToProps)(LoginSignup);




