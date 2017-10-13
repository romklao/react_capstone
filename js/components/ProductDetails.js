import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: -1,
            loading: true
        }
        // this.props.dispatch(actions.showProductDetails(this.props.productDetails));
        this.addFavoriteItems = this.addFavoriteItems.bind(this);
        this.deleteFavoriteItems = this.deleteFavoriteItems.bind(this);
        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
    }

    addFavoriteItems() {
        this.props.dispatch(actions.addFavorites(this.props.productDetails));
        if (!this.props.authenticated) {
            this.props.dispatch(actions.showLogin());
        }
    }

    deleteFavoriteItems(favoriteId) {
        this.props.dispatch(actions.deleteFavorites(
            {_id: favoriteId})
        )
    }

    previousImage() {
        if (this.state.index === -1) {
            this.setState({index: this.props.productDetails.ImageSets[0].ImageSet.length - 1});
        } else {
            this.setState({index: this.state.index - 1})
        }
    }

    nextImage() {
        if (this.state.index === this.props.productDetails.ImageSets[0].ImageSet.length - 1) {
            this.setState({index: -1});
        } else {
            this.setState({index: this.state.index + 1})
        }
    }

    render () {
        console.log('query', this.props.location.query.ASIN)
        if(this.props.productDetails) {
            var item = this.props.productDetails;
            var imageUrl;
            if (this.state.index === -1) {
                if(item.LargeImage[0].URL[0]) {
                    imageUrl = item.LargeImage[0].URL[0];
                }
            } else if (item.ImageSets[0].ImageSet) {
                imageUrl = item.ImageSets[0].ImageSet[this.state.index].LargeImage[0].URL[0];
            }

            var favoriteId = '';
            if (this.props.favorites) {
                for (var fav of this.props.favorites) {
                    if (fav.product.ASIN[0] === item.ASIN[0]) {
                        favoriteId = fav._id;
                        break;
                    }
                }
            }
            
            if (item.ItemAttributes["0"].Feature) {
                var features = [];
                var featuresLen = item.ItemAttributes["0"].Feature.length;

                for (var i=0; i<featuresLen; i++) {
                    var featuresI = item.ItemAttributes["0"].Feature[i];
                    features.push(<li key={i}>{featuresI}</li>);
                }
            }
            console.log('features', features)

            var addFavIcon = "glyphicon glyphicon-heart heartFav favHeartDetailsPage";
            var delFavIcon = "glyphicon glyphicon-heart heartFav changeToRed favHeartDetailsPage";

            if (favoriteId) {
                addFavIcon += " hidden"
            } else {
                delFavIcon += " hidden"
            }

            var productTitle;
            var salePrice;
            var salePriceInt;
            var amountSaved;
            var amountSavedInt;
            var percentageSaved;
            var fullPrice;
            var youSave;
            var save;

            if (item.Offers[0].Offer[0].OfferListing) {
                if (item.Offers[0].Offer[0].OfferListing[0].Price[0] &&
                    item.Offers[0].Offer[0].OfferListing[0].SalePrice) {
                    salePrice = item.Offers[0].Offer[0].OfferListing[0].SalePrice[0].FormattedPrice[0];
                    amountSaved = item.Offers[0].Offer[0].OfferListing[0].AmountSaved[0].FormattedPrice[0];
                    percentageSaved = item.Offers[0].Offer[0].OfferListing[0].PercentageSaved[0];

                    fullPrice = item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0];
                    youSave = 'You save: ';
                    save = amountSaved + '(' + percentageSaved + '%)'
                } else if (item.Offers[0].Offer[0].OfferListing[0].Price[0] &&
                    item.Offers[0].Offer[0].OfferListing[0].AmountSaved) {
                    salePrice = item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0];
                    salePriceInt = parseFloat(salePrice.replace(/\$/g, ''));
                    amountSaved = item.Offers[0].Offer[0].OfferListing[0].AmountSaved[0].FormattedPrice[0];
                    amountSavedInt = parseFloat(amountSaved.replace(/\$/g, ''));
                    percentageSaved = item.Offers[0].Offer[0].OfferListing[0].PercentageSaved[0];

                    fullPrice = '$'+ (salePriceInt + amountSavedInt).toFixed(2);
                    youSave = 'You save: ';
                    save = amountSaved + '(' + percentageSaved + '%)'
                } else {
                    salePrice = item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0];
                    fullPrice = '';
                    youSave = '';
                    save = '';
                }
            }
            if (item.ItemAttributes[0].Title) {
                productTitle = item.ItemAttributes[0].Title[0];
            }
            var arrowLeftUrl = "css/images/left-arrow.png";
            var arrowRightUrl = "css/images/right-arrow.png";
            var pageUrl = item.DetailPageURL[0];
            var blank = "_blank";
            var amazonLogoUrl = "css/images/amazon.png";
            var productFeature = item.ItemAttributes[0].Feature;

            return (
                <div className="productDetailsOuter">
                    <div className="productDetailsMiddle">
                        <div className="productDetailsInner">
                            <div className="row productQuickView">
                                <div className="col-sm-6 col-xs-12 productQuickViewImage">
                                    <div>
                                        <a href={pageUrl} target={blank}><img src={imageUrl} id="quickViewImage"/></a>
                                        <img src={arrowLeftUrl} onClick={this.previousImage} className="leftArrow leftArrowDetailsPage"/>
                                        <img src={arrowRightUrl} onClick={this.nextImage} className="rightArrow rightArrowDetailsPage"/>
                                        <span className={addFavIcon} onClick={this.addFavoriteItems}></span>
                                        <span className={delFavIcon} onClick={() => this.deleteFavoriteItems(favoriteId)}></span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-12 productDescription">
                                    <div className="productTitleBox">
                                        <p className="productTitle">{productTitle}</p>
                                        <span className="fullPriceCrossRed"><span className="fullPrice">{fullPrice}</span></span>
                                        <span className="price">{salePrice}</span>
                                        <p className="youSave">{youSave}<span className="save">{save}</span></p>
                                        <button className="addFavBtn" onClick={this.addFavoriteItems}>Add to Favorites</button>
                                        <div className="productFeature">
                                            <p>PRODUCT INFO</p>
                                            <ul>
                                                {features}
                                            </ul>
                                        </div>
                                        <a href={pageUrl} target={blank}><img src={amazonLogoUrl} className="amazonLogo"/></a>
                                    </div>
                                </div>
                            </div>
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
    favorites: state.favorites,
    searchResults: state.searchResults,
    authenticated: localStorage.authHeaders,
    confirmAddFavoriteMessage: state.confirmAddFavoriteMessage,
    productDetails: state.productDetails,
    errorSearchMessage: state.errorSearchMessage,
}) 

export default connect(mapStateToProps)(ProductDetails);
