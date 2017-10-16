import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Iframe from 'react-iframe';

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: -1,
            loading: true,
            iFrameHeight: '0px',
        }
        // this.props.dispatch(actions.showProductDetails(this.props.productDetails));
        this.props.dispatch(actions.getFavorites());
        this.addFavoriteItems = this.addFavoriteItems.bind(this);
        this.deleteFavoriteItems = this.deleteFavoriteItems.bind(this);
        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
        // this.resizeIframe = this.resizeIframe.bind(this);
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

    // resizeIframe(obj) {
    //     const obj = ReactDOM.findDOMNode(this);
    //                 this.setState({
    //                     "iFrameHeight":  obj.contentWindow.document.body.scrollHeight + 'px'
    //                 });
    // }

    render () {
        console.log('query', this.props.location.query.ASIN)
        if(this.props.productDetails) {
            var item = this.props.productDetails;
            var imageUrl;
            var imageSetLen = item.ImageSets[0].ImageSet.length;

            if (this.state.index === -1) {
                if(!item.LargeImage) {
                    imageUrl = item.ImageSets[0].ImageSet[imageSetLen-1].LargeImage[0].URL[0];
                } else if(item.LargeImage) {
                    imageUrl = item.LargeImage[0].URL[0];
                }
            } else if (item.ImageSets[0].ImageSet) {
                imageUrl = item.ImageSets[0].ImageSet[this.state.index].LargeImage[0].URL[0];
            }

            var eachImageUrl;
            var allImages = [];
            if (item.ImageSets[0].ImageSet) {
                for (let i=imageSetLen-1; i>=0; i--) {
                    eachImageUrl = item.ImageSets[0].ImageSet[i].LargeImage[0].URL[0];
                    allImages.push(<div className="smallImageBox" key={i}>
                                        <div className="smallImageBoxInner">
                                            <img src={eachImageUrl} className="smallImage" onMouseOver={() => this.setImage(i)} />
                                        </div>
                                   </div>);
                }
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

            var addFavIcon = "glyphicon glyphicon-heart heartFav favHeartDetailsPage";
            var delFavIcon = "glyphicon glyphicon-heart heartFav changeToRed favHeartDetailsPage";
            var addFavBtn = "addFavBtn addFavBtnDetails";
            var delFavBtn = "delFavBtn delFavBtnDetails"

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
                if (item.Offers[0].Offer[0].OfferListing[0].Price[0] &&
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
            var reviews = item.CustomerReviews[0].IFrameURL[0];

            return (
                <div className="productDetailsOuter">
                    <div className="productDetailsMiddle">
                        <div className="productDetailsInner">
                            <div className="row productDetailsBox">
                                <div className="col-md-6 col-sm-12 col-xs-12 productDetailsImage">
                                    <div className="productDetailsImageInner">
                                        <div>
                                            <a href={pageUrl} target={blank}><img src={imageUrl} id="quickViewImage"/></a>
                                            <img src={arrowLeftUrl} onClick={this.previousImage} className="leftArrow leftArrowDetailsPage"/>
                                            <img src={arrowRightUrl} onClick={this.nextImage} className="rightArrow rightArrowDetailsPage"/>
                                            <span className={addFavIcon} onClick={this.addFavoriteItems}></span>
                                            <span className={delFavIcon} onClick={() => this.deleteFavoriteItems(favoriteId)}></span>
                                        </div>
                                    </div>
                                    <div className="allImages">
                                        {allImages}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12 productDescription">
                                    <div className="productTitleBox">
                                        <p className="productTitle">{productTitle}</p>
                                        <span className="fullPriceCrossRed"><span className="fullPrice">{fullPrice}</span></span>
                                        <span className="price">{salePrice}</span>
                                        <p className="youSave">{youSave}<span className="save">{save}</span></p>
                                        <button className="addFavBtnDetails linkToAmazon"><a href={pageUrl} target={blank}>Available Now on Amazon</a></button>
                                        <button className={addFavBtn} onClick={this.addFavoriteItems}>Add to Favorites</button>
                                        <button className={delFavBtn} onClick={() => this.deleteFavoriteItems(favoriteId)}>Delete from Favorites</button>
                                        <div className="productFeature">
                                            <p>PRODUCT INFO</p>
                                            <ul>
                                                {features}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row reviewsContainer">
                        <Iframe url={reviews} 
                            position="absolute"
                            width="80%"
                            height="120%"
                            styles={{margin: "60px 120px"}}
                        />
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
