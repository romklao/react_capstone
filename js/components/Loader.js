import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

function Loader(props) {
    return (
        <div>
            <h1 className="load">Loading</h1>
        </div>
    );
}

const mapStateToProps = (state, props) => ({
    isLoading: state.isLoading
});

export default connect(mapStateToProps)(Loader);