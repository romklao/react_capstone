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
        hashHistory.push('/product_details');
    }

    render () {
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

            var addFavIcon = "glyphicon glyphicon-heart heartFav heartFavView";
            var delFavIcon = "glyphicon glyphicon-heart heartFav changeToRed";

            if (favoriteId) {
                addFavIcon += " hidden"
            } else {
                delFavIcon += " hidden"
            }

            var price;
            var productTitle;
            if (item.OfferSummary[0].LowestNewPrice) {
                price = item.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
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
                                <div className="col-sm-6 col-xs-12 productQuickViewImage">
                                    <div>
                                        <a href={pageUrl} target={blank}><img src={imageUrl} id="quickViewImage"/></a>
                                        <img src={arrowLeftUrl} onClick={this.previousImage} className="leftArrow"/>
                                        <img src={arrowRightUrl} onClick={this.nextImage} className="rightArrow"/>               
                                        <span className={addFavIcon} onClick={this.addFavoriteItems}></span>
                                        <span className={delFavIcon} onClick={() => this.deleteFavoriteItems(favoriteId)}></span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-12 productDescription">
                                    <div className="productTitleBox">
                                        <p className="productTitle">{productTitle}</p>
                                        <span className="price">{price}</span>
                                        <span onClick={this.showProductDetails} className="viewFullDetails">View Full Details</span>
                                        <button className="addFavBtn">Add to Favorites</button>
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
