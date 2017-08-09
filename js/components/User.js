import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
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

const mapStateToProps = (state, props) => ({
    user: state.user,
    authenticated: localStorage.authHeaders,
});

export default connect(mapStateToProps)(UserLogin);


