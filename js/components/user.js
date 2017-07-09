import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ShowSearchResults from './searchResults';
import ShowFavorites from './showFavorites';


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
                    <h1 className="errorSearch">{this.props.errorSearchMessage}</h1>
                );
            } else {
                return (
                    <div className="row userBox">
                        <div className="col-lg-12 col-xs-12">
                            <img src="css/images/sofabackground.jpg" className="userBackground"/>
                        </div>
                        <div className="col-lg-12 col-sm-12 user">
                            <p>Welcome {this.props.user}!</p>
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


