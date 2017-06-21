import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Navbar from './navbar';
import LandingPage from './landingPage';
import ShowSearchResults from './searchResults';
import WhatWeDoBox from './whatWeDoBox';
import ImageList from './imageList';
import LandingPageContainer from './landingPageContainer';
import UserLogin from './user';


export function App(props) {
    return (
        <div className="decorHome">
            <Navbar/>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default connect()(App);
