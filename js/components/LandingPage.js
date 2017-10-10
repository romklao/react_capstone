import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
// import SearchForm from './SearchForm';
// import LoginModal from './LoginModal';
// import SignupModal from './SignupModal';

function LandingPage(props) {
    return (
        <div className="row landing">
            <div className="col-md-6 col-xs-12 intro">
                <h1>FIND BEST PRODUCTS FROM AMAZON</h1>
                <p>Highly recommended by users</p>
            </div>
            <div className="col-md-6 col-xs-12 introImg">
            </div>
        </div>
    );
}

export default connect()(LandingPage);
