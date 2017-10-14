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
        hashHistory.push('/product_details?ASIN=${this.props.ASIN}');
        window.scrollTo(0, 0)
    }

    render () {
        let item = this.props.product;
        let imageUrl;
        let imageSetLen = item.ImageSets[0].ImageSet.length;

        if(!item.LargeImage) {
            imageUrl = item.ImageSets[0].ImageSet[imageSetLen-1].LargeImage[0].URL[0];
            console.log('imageUrl', imageUrl)
        } else if(item.LargeImage) {
            imageUrl = item.LargeImage[0].URL[0];
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
            </div>
        );
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
