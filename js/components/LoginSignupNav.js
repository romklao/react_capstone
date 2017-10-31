import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';

import * as actions from '../actions/index'

class LoginSignupNav extends React.Component {
    constructor(props) {
        super(props);
        this.showLogin = this.showLogin.bind(this);
        this.showSignup = this.showSignup.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.getFavoriteItems = this.getFavoriteItems.bind(this);
        this.gotoBeautySearch = this.gotoBeautySearch.bind(this);
        this.gotoElectronicsSearch = this.gotoElectronicsSearch.bind(this);
        this.gotoVitaminsSearch = this.gotoVitaminsSearch.bind(this);
        this.gotoBabySearch = this.gotoBabySearch.bind(this);
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

    gotoBeautySearch(event) {
        event.preventDefault();
        this.props.dispatch(actions.gotoBeautySearch());
        hashHistory.push('/category/Beauty');
    }

    gotoElectronicsSearch(event) {
        event.preventDefault();
        this.props.dispatch(actions.gotoElectronicsSearch());
        hashHistory.push('/category/Electronics');
    }

    gotoVitaminsSearch(event) {
        event.preventDefault();
        this.props.dispatch(actions.gotoVitaminsSearch());
        hashHistory.push('/category/HealthPersonalCare');
    }

    gotoBabySearch(event) {
        event.preventDefault();
        this.props.dispatch(actions.gotoBabySearch());
        hashHistory.push('/category/Baby');
    }

    render() {
        if (this.props.authenticated) {
            return (
                <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-1" aria-expanded="false">
                    <ul className="nav navbar-nav navCategory">
                        <li>
                            <a href="#" className="hidden-xs" id="home" onClick={this.gotoBabySearch}>Baby</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.gotoBabySearch}>Baby</a>
                        </li>
                        <li>
                            <a href="#" className="hidden-xs" id="home" onClick={this.gotoVitaminsSearch}>Vitamins</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.gotoVitaminsSearch}>Vitamins</a>
                        </li>
                        <li>
                            <a href="#" className="hidden-xs" id="beauty" onClick={this.gotoBeautySearch}>Beauty</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.gotoBeautySearch}>Beauty</a>
                        </li>
                        <li>
                            <a href="#" className="hidden-xs" id="electronics" onClick={this.gotoElectronicsSearch}>Electronics</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.gotoElectronicsSearch}>Electronics</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="#" className="hidden-xs" id="favLink" onClick={this.getFavoriteItems}>Favorites</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.getFavoriteItems}>Favorites</a>
                        </li>
                        <li>
                            <a href="#" className="hidden-xs" id="logoutLink" onClick={this.logoutUser}>Log Out</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.logoutUser}>Log Out</a>
                        </li>
                        <li>
                            <a href="link.html" className="hidden-xs not-active" id="electronics">Hi! {this.props.user}</a>
                            <a href="link.html" className="visible-xs not-active" data-toggle="collapse" data-target=".navbar-collapse">Hi! {this.props.user}</a>
                        </li>
                    </ul>
                </div>
            );
        } 
        else {
            return (
                <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-1" aria-expanded="false">
                    <ul className="nav navbar-nav navCategory">
                        <li>
                            <a href="#" className="hidden-xs" id="home" onClick={this.gotoBabySearch}>Baby</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.gotoBabySearch}>Baby</a>
                        </li>
                        <li>
                            <a href="#" className="hidden-xs" id="home" onClick={this.gotoVitaminsSearch}>Vitamins</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.gotoVitaminsSearch}>Vitamins</a>
                        </li>
                        <li>
                            <a href="#" className="hidden-xs" id="beauty" onClick={this.gotoBeautySearch}>Beauty</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.gotoBeautySearch}>Beauty</a>
                        </li>
                        <li>
                            <a href="#" className="hidden-xs" id="electronics" onClick={this.gotoElectronicsSearch}>Electronics</a>
                            <a href="#" className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={this.gotoElectronicsSearch}>Electronics</a>
                        </li>
                    </ul>
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
                </div>
            );
        }
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    authenticated: localStorage.authHeaders,
});
export default connect(mapStateToProps)(LoginSignupNav);

