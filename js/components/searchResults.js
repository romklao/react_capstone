import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './searchForm';
import ItemViews from './itemViews';
import Pagination from './pagination';

function ShowSearchResults(props) {
    if (props.searchResults) {
        let results = [];

        for (let i=0; i<10; i++) {
            let product = props.searchResults[i];

            results.push(<ItemViews product={product}
                                    key={i} />);
        }
        console.log('searchResults', props.searchResults)
        console.log('results', results)
        return (
            <div className="searchResults">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 searchText">
                        <h1>
                            <img src="css/images/lamp.png" className="furIcon"/>The results of {props.searchInput}
                        </h1>
                    </div>
                </div>
                <div className="row searchResultsBox">
                    {results}
                </div>
                <div className="row">
                    <Pagination />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        searchResults: state.searchResults,
        searchInput: state.searchInput,
        favorites: state.favorites,
        authenticated: state.authenticated,
        errorSearchMessage: state.errorSearchMessage,
        confirmAddFavoriteMessage: state.confirmAddFavoriteMessage
    }
} 

export default connect(mapStateToProps)(ShowSearchResults);






