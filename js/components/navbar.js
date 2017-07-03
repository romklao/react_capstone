import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import LoginModal from './login-modal';
import SignupModal from './signup-modal';
import LoginSignup from './loginSignup';
import ReturnToHome from './returnToHome';
import SearchForm from './searchForm'
import ShowFavorites from './showFavorites'

export function Navbar(props) {
    var loginModal;
    var signupModal;
    if(props.showLogin) {
        loginModal = <LoginModal />
    }
    if(props.showSignup) {
        signupModal = <SignupModal />
    }

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <ReturnToHome />
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <SearchForm />
                    <LoginSignup />
                    {loginModal}
                    {signupModal}

                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state, props) => ({

    showSignup: state.showSignup,
    showLogin: state.showLogin,
    favorites: state.favorites,
});

export default connect(mapStateToProps)(Navbar);


