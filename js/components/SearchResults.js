import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ItemViews from './ItemViews';
import Pagination from './Pagination';
import SearchForm from './SearchForm';

function ShowSearchResults(props) {
    if (props.searchResults) {
        let results = [];

        for (let i=0; i<10; i++) {
            let product = props.searchResults[i];

            results.push(<ItemViews product={product}
                                    key={i} />);
        }
        return (
            <div>
                <SearchForm />
                <div className="searchResults">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 searchText">
                            <h1>
                                <img src="css/images/home.png" className="furIcon"/>The results of {props.searchInput}
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
            </div>
        );
    } 
}

const mapStateToProps = (state, props) => ({
    searchResults: state.searchResults,
    searchInput: state.searchInput,
    favorites: state.favorites,
    authenticated: state.authenticated,
    errorSearchMessage: state.errorSearchMessage,
    confirmAddFavoriteMessage: state.confirmAddFavoriteMessage
});

export default connect(mapStateToProps)(ShowSearchResults);






