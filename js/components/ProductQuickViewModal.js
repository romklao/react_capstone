import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import {Link} from 'react-router';

import * as actions from '../actions/index';
import ProductDetails from './ProductDetails'

class ProductQuickViewModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: -1,
            loading: true
        }
        this.addFavoriteItems = this.addFavoriteItems.bind(this);
        this.deleteFavoriteItems = this.deleteFavoriteItems.bind(this);
        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.hide = this.hide.bind(this);
        this.showProductDetails = this.showProductDetails.bind(this);
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

    hide(event) {
        event.preventDefault();
        this.props.dispatch(actions.hide());
    };

    showProductDetails() {
        this.props.dispatch(actions.showProductDetails(this.props.productDetails));
        this.props.dispatch(actions.hide());
        hashHistory.push('/product_details?ASIN=${this.props.productDetails.ASIN}');
        window.scrollTo(0, 0)
    }

    render () {
        if(this.props.productDetails) {
            var item = this.props.productDetails;
            console.log('item', this.props.productDetails)
            var imageUrl;
            if (this.state.index === -1) {
                if(item.LargeImage[0].URL[0]) {
                    imageUrl = item.LargeImage[0].URL[0];
                }
            } else if (item.ImageSets[0].ImageSet) {
                imageUrl = item.ImageSets[0].ImageSet[this.state.index].LargeImage[0].URL[0];
            }

            var eachImageUrl;
            var allImages = [];
            var imageSetLen = item.ImageSets[0].ImageSet.length;
            if (item.ImageSets[0].ImageSet) {
                for (var i=imageSetLen-1; i>=0; i--) {
                    eachImageUrl = item.ImageSets[0].ImageSet[i].LargeImage[0].URL[0];
                    allImages.push(<div className="smallImageBox" key={i}>
                                        <div className="smallImageBoxInner">
                                            <img src={eachImageUrl} className="smallImage"/>
                                        </div>
                                   </div>);
                }
            }
            console.log('allImages', allImages);

            var favoriteId = '';
            if (this.props.favorites) {
                for (var fav of this.props.favorites) {
                    if (fav.product.ASIN[0] === item.ASIN[0]) {
                        favoriteId = fav._id;
                        break;
                    }
                }
            }

            var addFavIcon = "glyphicon glyphicon-heart heartFav heartFavView";
            var delFavIcon = "glyphicon glyphicon-heart heartFav changeToRed heartFavView";
            var addFavBtn = "addFavBtn";
            var delFavBtn = "delFavBtn"
            if (favoriteId) {
                addFavIcon += " hidden";
                addFavBtn += " hidden";
            } else {
                delFavIcon += " hidden";
                delFavBtn += " hidden";
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
                if (item.Offers[0].Offer[0].OfferListing[0].Price &&
                    item.Offers[0].Offer[0].OfferListing[0].SalePrice &&
                    item.Offers[0].Offer[0].OfferListing[0].AmountSaved &&
                    item.Offers[0].Offer[0].OfferListing[0].PercentageSaved) {

                    salePrice = item.Offers[0].Offer[0].OfferListing[0].SalePrice[0].FormattedPrice[0];
                    amountSaved = item.Offers[0].Offer[0].OfferListing[0].AmountSaved[0].FormattedPrice[0];
                    percentageSaved = item.Offers[0].Offer[0].OfferListing[0].PercentageSaved[0];

                    fullPrice = item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0];
                    youSave = 'You save: ';
                    save = amountSaved + '(' + percentageSaved + '%)'
                } else if (item.Offers[0].Offer[0].OfferListing[0].Price[0] &&
                    item.Offers[0].Offer[0].OfferListing[0].AmountSaved &&
                    item.Offers[0].Offer[0].OfferListing[0].PercentageSaved) {

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
                <div className="quickViewOuter">
                    <div className="quickViewMiddle">
                        <div className="quickViewInner">
                            <div>
                                <button type="button" className="close closeQuickView" data-dismiss="modal" aria-hidden="true" onClick={this.hide}>&times;</button>
                            </div>
                            <div className="row productQuickView">
                                <div className="col-lg-6 col-sm-12 col-xs-12 productQuickViewImage">
                                    <div className="productQuickViewImageInner">
                                        <div>
                                            <img src={imageUrl} id="quickViewImage" onClick={this.showProductDetails}/>
                                            <img src={arrowLeftUrl} onClick={this.previousImage} className="leftArrow"/>
                                            <img src={arrowRightUrl} onClick={this.nextImage} className="rightArrow"/>
                                            <span className={addFavIcon} onClick={this.addFavoriteItems}></span>
                                            <span className={delFavIcon} onClick={() => this.deleteFavoriteItems(favoriteId)}></span>
                                        </div>
                                    </div>
                                    <div className="allImages">
                                        {allImages}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12 col-xs-12 productDescription">
                                    <div className="productTitleBox">
                                        <p className="productTitle">{productTitle}</p>
                                        <span className="fullPriceCrossRed"><span className="fullPrice">{fullPrice}</span></span>
                                        <span className="price">{salePrice}</span>
                                        <span className="viewFullDetails" onClick={this.showProductDetails}>View Full Details</span>
                                        <p className="youSave">{youSave}<span className="save">{save}</span></p>
                                        <button className={addFavBtn} onClick={this.addFavoriteItems}>Add To Favorites</button>
                                        <button className={delFavBtn} onClick={() => this.deleteFavoriteItems(favoriteId)}>Delete From Favorites</button>
                                        <a href={pageUrl} target={blank}><img src={amazonLogoUrl} className="amazonLogo"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
}) 

export default connect(mapStateToProps)(ProductQuickViewModal);
