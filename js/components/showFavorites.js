import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import ShowSearchResults from './showFavorites';
import ItemViews from './itemViews';


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
                        let icon2 = "glyphicon glyphicon-heart changeToRed"
                        let price = favItem.product.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
                        let imgURL = favItem.product.ImageSets[0];
                        let pageUrl = favItem.product.DetailPageURL[0];
                        let blank = "_blank";
                        let amazonLogoUrl = "css/images/amazonLogo.png";
                        let arrowLeftUrl = "css/images/arrowLeft.png";
                        let arrowRightUrl = "css/images/right.png";
                        let productTitle = favItem.product.ItemAttributes[0];

                        favoritesResults.push(<ItemViews imageUrl={imgURL} 
                                                        icon2={icon2} 
                                                        key={i}
                                                        product={favItem}
                                                        price={price}
                                                        pageUrl={pageUrl}
                                                        arrowLeftUrl={arrowLeftUrl}
                                                        arrowRightUrl={arrowRightUrl}
                                                        blank ={blank}
                                                        productTitle={productTitle}
                                                        amazonLogoUrl={amazonLogoUrl} />);
                    }
                }
                console.log('favRe', favoritesResults)
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
}

const mapStateToProps = (state, props) => { 
    return {
        authenticated: localStorage.authHeaders,
        favorites: state.favorites,
        searchResults: state.searchResults,
    }
}

export default connect(mapStateToProps)(ShowFavorites);
