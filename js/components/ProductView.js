import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import {Link} from 'react-router';

import * as actions from '../actions/index';

class ProductView extends React.Component {
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
        this.setImage = this.setImage.bind(this);
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

    nextImage() {
        if (this.state.index === -1) {
            this.setState({index: this.props.productDetails.ImageSets[0].ImageSet.length - 1});
        } else {
            this.setState({index: this.state.index - 1})
        }
    }

    previousImage() {
        if (this.state.index === this.props.productDetails.ImageSets[0].ImageSet.length - 1) {
            this.setState({index: -1});
        } else {
            this.setState({index: this.state.index + 1})
        }
    }

    setImage(imageIndex) {
        this.setState({index: imageIndex});
    }

    hide(event) {
        event.preventDefault();
        this.props.dispatch(actions.hide());
    };

    render () {
        if(this.props.productDetails === null) {
            console.log('No product details for?')
        }
        if(this.props.productDetails) {
            let item = this.props.productDetails;
            let imageUrl;
            let imageSetLen = item.ImageSets[0].ImageSet.length;
            if (this.state.index === -1) {
                if(!item.LargeImage) {
                    imageUrl = item.ImageSets[0].ImageSet[imageSetLen-1].LargeImage[0].URL[0];
                } else if(item.LargeImage) {
                    imageUrl = item.LargeImage[0].URL[0];
                }
            } else if (item.ImageSets[0].ImageSet) {
                imageUrl = item.ImageSets[0].ImageSet[this.state.index].LargeImage[0].URL[0];
            }

            let eachImageUrl;
            let allImages = [];
            if (item.ImageSets[0].ImageSet) {
                for (let i=imageSetLen-1; i>=0; i--) {
                    eachImageUrl = item.ImageSets[0].ImageSet[i].LargeImage[0].URL[0];
                    allImages.push(<div className="smallImageBox" key={i}>
                                        <div className="smallImageBoxInner">
                                            <img src={eachImageUrl} className="smallImage" onMouseOver={() => this.setImage(i)}/>
                                        </div>
                                   </div>);
                }
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

            let addFavIcon = "glyphicon glyphicon-heart heartFav heartFavView";
            let delFavIcon = "glyphicon glyphicon-heart heartFav changeToRed heartFavView";
            let addFavBtn = "addFavBtn";
            let delFavBtn = "delFavBtn"
            if (favoriteId) {
                addFavIcon += " hidden";
                addFavBtn += " hidden";
            } else {
                delFavIcon += " hidden";
                delFavBtn += " hidden";
            }

            let productTitle;
            let salePrice;
            let salePriceInt;
            let amountSaved;
            let amountSavedInt;
            let percentageSaved;
            let fullPrice;
            let youSave;
            let save;

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

                    fullPrice = '$' + (salePriceInt + amountSavedInt).toFixed(2);
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
            let arrowLeftUrl = "css/images/left-arrow.png";
            let arrowRightUrl = "css/images/right-arrow.png";
            let pageUrl = item.DetailPageURL[0];
            let blank = "_blank";
            let amazonLogoUrl = "css/images/amazon.png";
            let productFeature = item.ItemAttributes[0].Feature;

            return (
                <div>
                    <div className="row productQuickView">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 productQuickViewImage">
                            <div className="productQuickViewImageInner">
                                <div>
                                    <a href={pageUrl} target={blank}><img src={imageUrl} id="quickViewImage"/></a>
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
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 productDescription">
                            <div className="productTitleBox">
                                <div>
                                    <p className="productTitle">{productTitle}</p>
                                    <span className="fullPriceCross"><span className="fullPrice">{fullPrice}</span></span>
                                    <span className="price">{salePrice}</span>
                                    {this.props.fullDetailsLink}
                                    <p className="youSave">{youSave}<span className="save">{save}</span></p>
                                    <button className="linkToAmazonQV linkToAmazon"><a href={pageUrl} target={blank}>Available Now on Amazon</a></button>
                                    <button className={addFavBtn} onClick={this.addFavoriteItems}>Add to Favorites</button>
                                    <button className={delFavBtn} onClick={() => this.deleteFavoriteItems(favoriteId)}>Delete from Favorites</button>
                                    {this.props.extraDetails}
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.customerReviews}
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

export default connect(mapStateToProps)(ProductView);
