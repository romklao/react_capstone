import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Navbar from './navbar';
import LandingPage from './landingPage';
import WhatWeDoBox from './whatWeDoBox';
import ImageList from './imageList';
import HomepageContainer from './homepageContainer'


export function App(props) {
    return (
        <div className="decorHome">
            <Navbar/>
            // <HomepageContainer />
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default connect()(App);
