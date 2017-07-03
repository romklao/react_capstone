import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';

import * as actions from '../actions/index'

class LoginSignup extends React.Component {
    constructor(props) {
        super(props);
        this.showLogin = this.showLogin.bind(this);
        this.showSignup = this.showSignup.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.getFavoriteItems = this.getFavoriteItems.bind(this);
    }
    showLogin(event) {
        event.preventDefault();
        this.props.dispatch(actions.showLogin());
    }

    showSignup(event) {
        event.preventDefault();
        this.props.dispatch(actions.showSignup());
    }

    logoutUser(event) {
        event.preventDefault();
        this.props.dispatch(actions.logout());
    }

    getFavoriteItems(event) {
        event.preventDefault();
        hashHistory.push('/myfavorites');
    }

    render() {
        if (this.props.authenticated) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li className="loginHi">Hi! {this.props.user}</li>
                    <li><a href="#" onClick={this.getFavoriteItems}>Favorites</a></li>
                    <li><a href="#" onClick={this.logoutUser}>Log Out</a></li>
                </ul>
            );
        } 
        else {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/" onClick={this.showLogin} id="loginLink">Log In</Link></li>
                    <li><Link to="/" onClick={this.showSignup} id="signupLink">Sign Up</Link></li>
                </ul>
            );
        }
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    authenticated: localStorage.authHeaders,
});
export default connect(mapStateToProps)(LoginSignup);




