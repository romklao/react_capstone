import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import LoginSignup from './LoginSignup';
import ReturnToHome from './returnToHome';
import SearchForm from './searchForm';
import ShowFavorites from './showFavorites';

export function Navbar(props) {
    return (
        <nav className="navbar navbar-default navbar-fixed-top" id="navbarFixed">
            <div className="container-fluid">
                <ReturnToHome />
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <SearchForm />
                    <LoginSignup />
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
