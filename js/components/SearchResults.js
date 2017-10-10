import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ItemView from './ItemView';
import Pagination from './Pagination';
import SearchForm from './SearchForm';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import LandingPageContainer from './LandingPageContainer';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        console.log('query',this.props.location.query)
        if (this.props.searchResults) {
            console.log('searchResults', this.props.searchResults)
            let results = [];

            for (let i=0; i<10; i++) {
                let product = this.props.searchResults[i];

                results.push(<ItemView product={product}
                                        key={i} />);
            }
            console.log('results', results);
            return (
                <div className="searchResultsContainer">
                    <div>
                        <h1>
                            The results of {this.props.searchInput}
                        </h1>
                        <div className="row searchResultsBox">
                            {results}
                        </div>
                        <div className="row">
                            <Pagination />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="errorMsgWrap">
                    <h1 className="errorSearch">{this.props.errorSearchMessage}</h1>
                </div>
            );
        }  
    } 
}

const mapStateToProps = (state, props) => ({
    searchResults: state.searchResults,
    searchInput: state.searchInput,
    favorites: state.favorites,
    authenticated: state.authenticated,
    errorSearchMessage: state.errorSearchMessage,
    confirmAddFavoriteMessage: state.confirmAddFavoriteMessage,
    isLoading: state.isLoading
});

export default connect(mapStateToProps)(SearchResults);






