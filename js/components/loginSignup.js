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
                    <li>
                        <a href="#" className="hidden-xs" id="favLink" onClick={this.getFavoriteItems}>Favorites</a>
                        <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.getFavoriteItems}>Favorites</a>
                    </li>
                    <li>
                        <a href="#" className="hidden-xs" id="logoutLink" onClick={this.logoutUser}>Log Out</a>
                        <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.logoutUser}>Log Out</a>
                    </li>
                </ul>
            );
        } 
        else {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="/" onClick={this.showLogin} className="hidden-xs" id="loginLink">Log In</a>
                        <a href="/" onClick={this.showLogin} className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse">Log In</a>
                    </li>
                    <li>
                        <a href="/" onClick={this.showSignup} className="hidden-xs" id="signupLink">Sign Up</a>
                        <a href="/" onClick={this.showSignup} className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse">Sign Up</a>
                    </li>
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




