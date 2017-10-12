import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ItemView from './ItemView';
import SearchForm from './SearchForm';

class ShowFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(actions.getFavorites());
    }

    render () {
        if (this.props.authenticated) {
            let favoritesResults = [];

            if (this.props.favorites) {
                for (var i=0; i < this.props.favorites.length; i++) {
                    var favItem = this.props.favorites[i];
                    if (favItem.product.OfferSummary) {
                        favoritesResults.push(<ItemView product={favItem.product}
                                                        key={i} />);
                    }
                }
            }
            return (
                <div className="searchResultsContainer">
                    <div>
                        <h1>
                            Your Favorite Items
                        </h1>
                        <div className="row searchResultsBox">
                            {favoritesResults}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="errorMsgWrap">
                    <h1 className="errorSearch">No favorite results!</h1>
                    <h3>Please log in or sign up to save your favorite items</h3>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, props) => ({ 
    authenticated: localStorage.authHeaders,
    favorites: state.favorites,
    searchResults: state.searchResults,
});

export default connect(mapStateToProps)(ShowFavorites);
