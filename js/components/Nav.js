import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import LoginSignupNav from './LoginSignupNav';
import BackToHome from './BackToHome';
import ShowFavorites from './ShowFavorites';

export function Nav(props) {
    
    return (
        <nav className="navbar navbar-default navbar-fixed-top" id="navbarFixed">
            <div className="container-fluid">
                <BackToHome />
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <LoginSignupNav />
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

export default connect(mapStateToProps)(Nav);