import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './SearchForm';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function LandingPage(props) {
    let showLogin = event => {
        event.preventDefault();
        props.dispatch(actions.showLogin());
    }
    let showSignup = event => {
        event.preventDefault();
        props.dispatch(actions.showSignup());
    }
    return (
        <div className="landing">
            <div className="row landingPage">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div>
                        <img src="css/images/living3.jpg" className="imageLivingroom"/>
                    </div>
                </div>
            </div>
            <div className="row landingIntro">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div>
                        <p className="title">We can help you decorate your home</p>
                        <img src="css/images/arrow.png" />
                        <SearchForm />
                    </div>
                </div>
            </div>
        </div>    
    );
}

const mapStateToprops = (state, props) => ({
    showSignup: state.showSignup,
    showLogin: state.showLogin
});

export default connect(mapStateToprops)(LandingPage);
