import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export function ReturnToHome(props) {

    return (
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">RomeDecor</a>
        </div>
    );
}

export default connect()(ReturnToHome);