import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ItemViews from './ItemViews';
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
                        favoritesResults.push(<ItemViews product={favItem.product}
                                                        key={i} />);
                    }
                }
            }
            return (
                <div className="showFavoritesWrap">
                    <SearchForm />
                    <div className="showFavoritesContainer">
                        <div className="showFavorites">
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 searchText">
                                    <h1>
                                        <img src="css/images/home.png" className="furIcon"/>Your favorite items
                                    </h1>
                                </div>
                            </div>
                            <div className="row showFavoriteResults">
                                {favoritesResults}
                            </div>
                        </div>
                    </div>
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
