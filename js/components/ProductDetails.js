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
            var productDetails = this.props.productDetails;
            var imageUrl;
            if (this.state.index === -1) {
                if(productDetails.LargeImage[0].URL[0]) {
                    imageUrl = productDetails.LargeImage[0].URL[0];
                }
            } else if (productDetails.ImageSets[0].ImageSet) {
                imageUrl = productDetails.ImageSets[0].ImageSet[this.state.index].LargeImage[0].URL[0];
            }

            var favoriteId = '';
            if (this.props.favorites) {
                for (var fav of this.props.favorites) {
                    if (fav.product.ASIN[0] === productDetails.ASIN[0]) {
                        favoriteId = fav._id;
                        break;
                    }
                }
            }
            
            if (productDetails.ItemAttributes["0"].Feature) {
                var features = [];
                var featuresLen = productDetails.ItemAttributes["0"].Feature.length;

                for (var i=0; i<featuresLen; i++) {
                    var featuresI = productDetails.ItemAttributes["0"].Feature[i];
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

            var price;
            var productTitle;
            if (productDetails.OfferSummary[0].LowestNewPrice) {
                price = productDetails.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
            }
            if (productDetails.ItemAttributes[0].Title) {
                productTitle = productDetails.ItemAttributes[0].Title[0];
            }
            var arrowLeftUrl = "css/images/left-arrow.png";
            var arrowRightUrl = "css/images/right-arrow.png";
            var pageUrl = productDetails.DetailPageURL[0];
            var blank = "_blank";
            var amazonLogoUrl = "css/images/amazon.png";
            var productFeature = productDetails.ItemAttributes[0].Feature;

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
                                        <span className="price priceDetailsPage">{price}</span>
                                        <button className="addFavBtn addFavBtnDetailsPage" onClick={this.addFavoriteItems}>Add to Favorites</button>
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
