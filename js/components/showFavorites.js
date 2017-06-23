import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ShowSearchResults from './showFavorites';
import ItemView from './itemViews';


class ShowFavorites extends React.Component {
        constructor(props) {
            super(props);
            this.props.dispatch(actions.getFavorites());
    }

    render () {
        
        if (this.props.authenticated) {
            var favoritesResults = [];
            var icon = "glyphicon glyphicon-heart heartFav changeToRed"
            if (this.props.favorites) {
                for (var i=0; i < this.props.favorites.length; i++) {
                    var favItem = this.props.favorites[i];
                    if (favItem.product.OfferSummary) {
                        var price = favItem.product.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
                        var imgURL = favItem.product.ImageSets[0];
                        
                        favoritesResults.push(<ItemView imageUrl={imgURL} 
                                           icon={icon} 
                                           key={i}
                                           price={price} />);
                    }
                }
                console.log('favRe', favoritesResults)
            }
        }

        return (
            <div className="showFavoritesContainer">
                <div className="showFavorites">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 searchText">
                            <h1>Your favorite items!</h1>
                        </div>
                    </div>
                    <div className="row">
                        {favoritesResults}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => { 
    return {
        authenticated: localStorage.authHeaders,
        favorites: state.favorites,
    }
}

export default connect(mapStateToProps)(ShowFavorites);
