import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ItemView from './ItemView';
import Pagination from './Pagination';
import LandingPageContainer from './LandingPageContainer';
import Footer from './Footer';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(actions.searchSubmit(this.props.location.query.keywords, 
                                                 this.props.location.query.category,
                                                 this.props.location.query.page));
    }

    render () {

        if (this.props.isLoading) {
            return (
                <div>
                    <h1 className="load">Loading</h1>
                </div>
            );
        } else if (this.props.searchResults) {
            console.log('searchResults', this.props.searchResults)
            let results = [];

            for (let i=0; i<10; i++) {
                let product = this.props.searchResults[i];

                results.push(<ItemView product={product}
                                        category={this.props.location.query.category}
                                        keywords={this.props.location.query.keywords}
                                        keywords={this.props.location.query.page}
                                        key={i} />);
            }
            console.log('results', results);
            return (
                <div className="searchResultsContainer">
                    <div className="searchResultsWrap">
                        <h1>
                            {this.props.searchInput}
                        </h1>
                        <div className="row searchResultsBox">
                            {results}
                        </div>
                        <div className="row">
                            <Pagination category={this.props.location.query.category}
                                        keywords={this.props.location.query.keywords} />
                        </div>
                    </div>
                    <Footer/>
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






