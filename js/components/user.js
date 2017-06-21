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

        return (
            <div className="row userBox">
                <div className="col-lg-12 col-sm-12 user">
                    <p>welcome {this.props.user}!</p>
                </div>
                <ShowSearchResults />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    authenticated: localStorage.authHeaders,
});

export default connect(mapStateToProps)(UserLogin);