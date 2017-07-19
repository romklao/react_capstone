import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import LandingPage from './LandingPage';
import WhatWeDo from './WhatWeDo';
import ShowImageList from './ShowImageList';
import ShowSearchResults from './SearchResults';
import UserLogin from './User';


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
        );
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
                    <WhatWeDo />
                    <ShowImageList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    landingPageHidden: state.landingPageHidden,
    searchResults: state.searchResults,
    authenticated: localStorage.authHeaders,
    errorSearchMessage: state.errorSearchMessage,
});

export default connect(mapStateToProps)(LandingPageContainer);




