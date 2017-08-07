import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ShowSearchResults from './SearchResults';
import ShowFavorites from './ShowFavorites';
import SearchForm from './SearchForm';


class UserLogin extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.username) {
            window.location = '/'
        } 
    }
    
    render () {
        if (this.props.authenticated) {
            if (this.props.searchResults) {
                return (
                    <div className="searchResultsContainer">
                        <ShowSearchResults />
                    </div>
                );
            } else if (this.props.errorSearchMessage) {
                return (
                    <div className="errorMsgWrap">
                        <SearchForm />
                        <h1 className="errorSearch">{this.props.errorSearchMessage}</h1>
                    </div>
                );
            } else {
                return (
                    <div className="row userBox">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 userBackground">
                            <img src="css/images/sofaUser.jpg"/>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 user">
                            <p>Welcome {this.props.user}!</p>
                            <SearchForm />
                        </div>
                    </div>
                );
            }
        }
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    authenticated: localStorage.authHeaders,
    searchResults: state.searchResults,
    errorSearchMessage: state.errorSearchMessage,
    favorites: state.favorites,
});

export default connect(mapStateToProps)(UserLogin);


