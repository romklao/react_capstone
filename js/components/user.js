import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ShowSearchResults from './searchResults';


class UserLogin extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.username) {
            window.location = '/'
        } 
    }
    
    render () {
        if (!this.props.searchResults) {
            return (
                <div className="row userBox">
                    <div className="col-lg-12 col-sm-12 user">
                        <p>Welcome {this.props.user}!</p>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="row userBox">
                    <div className="col-lg-12 col-sm-12 user">
                        <p>Welcome {this.props.user}!</p>
                    </div>
                </div>
                <div className="searchResultsContainer">
                    <ShowSearchResults />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    authenticated: localStorage.authHeaders,
    searchResults: state.searchResults,
});

export default connect(mapStateToProps)(UserLogin);