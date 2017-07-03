import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SignupModal from './signup-modal';

class ItemViews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }
        this.addFavoriteItems = this.addFavoriteItems.bind(this);
        this.deleteFavoriteItems = this.deleteFavoriteItems.bind(this);
        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
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
        ).then(() =>
            this.props.dispatch(actions.getFavorites())
        )
    }

    previousImage() {
        if (this.state.index === 0) {
            this.setState({index: this.props.product.ImageSets[0].ImageSet.length - 1});
        } else {
            this.setState({index: this.state.index - 1})
        }
    }

    nextImage() {
        if (this.state.index === this.props.product.ImageSets[0].ImageSet.length - 1) {
            this.setState({index: 0});
        } else {
            this.setState({index: this.state.index + 1})
        }
    }

    render () {
        var item = this.props.product;
        if (item.ImageSets[0].ImageSet) {
            var imageUrl = item.ImageSets[0].ImageSet[this.state.index].LargeImage[0].URL[0];
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

        var addFavIcon = "glyphicon glyphicon-heart heartFav";
        var delFavIcon = "glyphicon glyphicon-heart heartFav changeToRed";

        if (favoriteId) {
            addFavIcon += " hidden"
        } else {
            delFavIcon += " hidden"
        }

        var price;
        var productTitle;
        if (item.OfferSummary) {
            price = item.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
        }
        if (item.ItemAttributes[0].Title) {
            productTitle = item.ItemAttributes[0].Title[0];
        }
        var arrowLeftUrl = "css/images/arrowLeft.png";
        var arrowRightUrl = "css/images/rightArrow.png";
        var pageUrl = item.DetailPageURL[0];
        var blank = "_blank";
        var amazonLogoUrl = "css/images/amazonLogo.png";
        var productFeature = item.ItemAttributes[0].Feature;

        return (
            <div className="col-lg-6 col-sm-12 col-xs-12 itemResults">
                <div>
                    <img src={imageUrl} id="imageProduct"/>
                    <img src={arrowLeftUrl} onClick={this.previousImage} className="leftArrow"/>
                    <img src={arrowRightUrl} onClick={this.nextImage} className="rightArrow"/>               
                    <span className={addFavIcon} onClick={this.addFavoriteItems}></span>
                    <span className={delFavIcon} onClick={() => this.deleteFavoriteItems(favoriteId)}></span>
                </div>
                <div className="productDescription">
                    <div className="productTitleBox">
                        <p className="productTitle">{productTitle}</p>
                        <a href={pageUrl} target={blank}><img src={amazonLogoUrl} className="amazonLogo"/></a>
                        <span className="price">{price}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    favorites: state.favorites,
    searchResults: state.searchResults,
    authenticated: localStorage.authHeaders,
    confirmAddFavoriteMessage: state.confirmAddFavoriteMessage
}) 

export default connect(mapStateToProps)(ItemViews);
