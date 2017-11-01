import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import {Link} from 'react-router';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';

class ItemView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
        this.addFavoriteItems = this.addFavoriteItems.bind(this);
        this.deleteFavoriteItems = this.deleteFavoriteItems.bind(this);
        this.showProductDetails = this.showProductDetails.bind(this);
        this.showProductQuickView = this.showProductQuickView.bind(this);
        this.hide = this.hide.bind(this);
    }

    addFavoriteItems() {
        this.props.dispatch(actions.addFavorites(this.props.product));
        if (!this.props.authenticated) {
            this.props.dispatch(actions.showLogin());
        }
    }

    deleteFavoriteItems(favoriteId) {
        this.props.dispatch(actions.deleteFavorites(
            {_id: favoriteId})
        )
        hashHistory.push('/myfavorites');
    }

    hide(event) {
        event.preventDefault();
        this.props.dispatch(actions.hide());
    };

    showProductQuickView() {
        this.props.dispatch(actions.showProductQuickView(this.props.product));
    }

    showProductDetails() {
        this.props.dispatch(actions.showProductDetails(this.props.product));
        hashHistory.push(`/product_details?ASIN=${this.props.product.ASIN}`);
        window.scrollTo(0, 0)
    }

    render () {
        if(this.props.product) {
            let item = this.props.product;
            let imageUrl;

            if(!item.LargeImage && item.ImageSets) {
                var imageSetLen = item.ImageSets[0].ImageSet.length;
                imageUrl = item.ImageSets[0].ImageSet[imageSetLen-1].LargeImage[0].URL[0];
            } else if(item.LargeImage) {
                imageUrl = item.LargeImage[0].URL[0];
            } else {
                imageUrl = 'css/images/amazon.png';
            }

            let favoriteId = '';
            if (this.props.favorites) {
                for (let fav of this.props.favorites) {
                    if (fav.product.ASIN[0] === item.ASIN[0]) {
                        favoriteId = fav._id;
                        break;
                    }
                }
            }

            let addFavIcon = "glyphicon glyphicon-heart heartFav";
            let delFavIcon = "glyphicon glyphicon-heart heartFav changeToRed";

            if (favoriteId) {
                addFavIcon += " hidden"
            } else {
                delFavIcon += " hidden"
            }

            let productTitle;
            let salePrice;
            let salePriceInt;
            let amountSaved;
            let amountSavedInt;
            let percentageSaved;
            let fullPrice;
            let save;

            console.assert(item.Offers.length > 0, item.Offers)
            console.assert(item.Offers[0].Offer.length > 0, item.Offers[0].Offer)
            console.assert(item.Offers[0].Offer[0].OfferListing.length > 0, item.Offers[0].Offer[0].OfferListing)

            let offer = item.Offers[0].Offer[0].OfferListing[0];
            if (offer.Price && 
                offer.SalePrice &&
                offer.AmountSaved &&
                offer.PercentageSaved) {

                salePrice = offer.SalePrice[0].FormattedPrice[0];
                amountSaved = offer.AmountSaved[0].FormattedPrice[0];
                percentageSaved = offer.PercentageSaved[0];

                fullPrice = offer.Price[0].FormattedPrice[0];
                save = '(' + percentageSaved + '% off)';
            } else if (offer.Price[0] &&
                offer.AmountSaved &&
                offer.PercentageSaved) {

                salePrice = offer.Price[0].FormattedPrice[0];
                salePriceInt = parseFloat(salePrice.replace(/\$/g, ''));
                amountSaved = offer.AmountSaved[0].FormattedPrice[0];
                amountSavedInt = parseFloat(amountSaved.replace(/\$/g, ''));
                percentageSaved = offer.PercentageSaved[0];

                fullPrice = '$'+ (salePriceInt + amountSavedInt).toFixed(2);
                save = '(' + percentageSaved + '% off)';
            } else if (offer.Price){
                salePrice = offer.Price[0].FormattedPrice[0];
                fullPrice = '';
                save = '';
            } else {
                salePrice = '';
                fullPrice = '';
                save = '';
            }

            if (item.ItemAttributes) {
                if(item.ItemAttributes[0].Title) {
                    productTitle = item.ItemAttributes[0].Title[0];
                } else {
                    productTitle = '';
                }
            }

            return (
                <div className="col-lg-4 col-sm-6 col-xs-12 itemResults wrapper">
                    <div className="imageProductBox parentImage">
                        <div className="childImage">
                            <img src={imageUrl} className="imageProduct" onClick={this.showProductDetails}/>
                            <span className={addFavIcon} onClick={this.addFavoriteItems}></span>
                            <span className={delFavIcon} onClick={() => this.deleteFavoriteItems(favoriteId)}></span>
                            <p className="quickview" onClick={this.showProductQuickView}>QUICK VIEW</p>
                        </div>
                    </div>
                    <div className="productTitleListBox">
                        <span className="fullPriceCross"><span className="fullPriceList">{fullPrice}</span></span>
                        <span className="priceList">{salePrice}</span>
                        <span className="saveList">{save}</span>
                    </div>
                </div>
            );
        } else {
                return null;
        }
    }
}

const mapStateToProps = (state, props) => ({
    favorites: state.favorites,
    searchResults: state.searchResults,
    authenticated: localStorage.authHeaders,
    confirmAddFavoriteMessage: state.confirmAddFavoriteMessage,
    productDetails: state.productDetails
}) 

export default connect(mapStateToProps)(ItemView);
