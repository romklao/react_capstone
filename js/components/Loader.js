import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

function Loader(props) {
    if (props.isLoading) {
        console.log('loading')
        return (
            <h1 className="isLoading">Loading</h1>
        );
    }
}

const mapStateToProps = (state, props) => ({
    isLoading: state.isLoading
});

export default connect(mapStateToProps)(Loader);