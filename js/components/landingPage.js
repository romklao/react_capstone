import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export function LandingPage(props) {
    return (
        <div>
            <div className="row landingPage">
                <div className="col-lg-12 col-xs-12">
                    <div>
                        <img src="css/images/living3.jpg" className="imageLivingroom" />
                    </div>
                </div>
            </div>
            <div className="row landingIntro">
                <div className="col-lg-12 col-md-12">
                    <div>
                        <p className="title">We can help you decorate your home</p>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default connect()(LandingPage);
