import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import LandingPage from './landingPage';
import WhatWeDoBox from './whatWeDoBox';
import ImageList from './imageList';
import ShowSearchResults from './searchResults';
import UserLogin from './user';


function LandingPageContainer(props) {
    if (props.searchResults) {
        return (
            <div className="searchResultsContainer">
                <ShowSearchResults />
            </div>
        );
    } else if (props.errorSearchMessage) {
        return (
            <h1 className="errorSearch">{props.errorSearchMessage}</h1>
        )
    } else if (props.authenticated) {
        if (props.searchResults) {
            return (
                <div className="searchResultsContainer">
                    <ShowSearchResults />
                </div>
            );
        } else if (props.errorSearchMessage) {
            return (
                <h1 className="errorSearch">{props.errorSearchMessage}</h1>
            );
        } else {
            return (
                <div>
                    <UserLogin />
                </div>
            );
        }
    } else {
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
}

const mapStateToProps = (state, props) => {
    return {
        landingPageHidden: state.landingPageHidden,
        searchResults: state.searchResults,
        authenticated: localStorage.authHeaders,
        errorSearchMessage: state.errorSearchMessage,
    }
}

export default connect(mapStateToProps)(LandingPageContainer);




