import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export function UserLogin(props) {
    let username;
    if(props.user) {
        console.log('user login')
    }

    return (
        <div className="user">
            <p>welcome</p>
        </div>
    )
}

const mapStateToProps = (state, props) => ({
    user: state.user
});

export default connect(mapStateToProps)(UserLogin);