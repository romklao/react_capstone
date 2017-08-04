import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

function Downloading(props) {
    return (
        <div className="waiting">

        </div>
    )
}

const mapStateToProps = (state, props) => ({
    searchResults: state.searchResults,
});

export default connect(mapStateToProps)(Downloading)