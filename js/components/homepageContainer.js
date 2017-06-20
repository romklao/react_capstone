import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import LandingPage from './landingPage';
import WhatWeDoBox from './whatWeDoBox';
import ImageList from './imageList';
import SearchResults from './searchResults';


export function HomepageContainer(props) {
    return (
        <div className="indexPage">
            <div>
                <LandingPage />
            </div>
            <div className="container">
                <WhatWeDoBox />
                <ImageList />
            </div>
        </div>
    );
}

export default connect()(HomepageContainer);
