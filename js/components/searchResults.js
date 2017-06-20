import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './searchForm';
import UserLogin from './user';

class ShowSearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    makeSearchSubmit(event) {
        event.preventDefault();
        this.props.dispatch(actions.makeSearchSubmitMsg());
    }

    render() {

        return (
            <div className="row searchResults">
                <div className="col-lg-12 col-sm-12">
                    <h1>The results of: {this.props.searchInput} !</h1>
                </div>
            </div>
        );

    }
    
}

const mapStateToProps = (state, props) => {
    return {
        searchResults: state.searchResults,
        searchInput: state.searchInput,
    }
} 

export default connect(mapStateToProps)(ShowSearchResults);