import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SignupModal from './signup-modal';

class ItemViews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            background: [],
            current: undefined,
            ready: false,
            index: 0
        }
        this.addFavoriteItems = this.addFavoriteItems.bind(this);
        this.deleteFavoriteItems = this.deleteFavoriteItems.bind(this);
        this.switchImage = this.switchImage.bind(this);
        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.preloadNextImage = this.preloadNextImage.bind(this);
    }

    addFavoriteItems(event) {
        event.preventDefault();
        this.props.dispatch(actions.addFavorites(this.props.product));
        if (!this.props.authenticated) {
            this.props.dispatch(actions.showSignup());
        }
    }

    deleteFavoriteItems(event) {
        event.preventDefault(event);
        this.props.dispatch(actions.deleteFavorites(this.props.product));
    }

    switchImage(event) {
        event.preventDefault();
        if (this.state.index === this.props.product.ImageSets[0].ImageSet) {
        this.setState({ background: newArray, current: 0, ready: true, index: i});
        }
    }

    preloadNextImage() {
        let current = this.state.current;
        let background = this.state.background;
        if ( (current != undefined) && (current < background.length - 1)) {
            return (
                <img src={this.state.background[this.state.current + 1]} />
            )
        } else {
            return null;
        }
    }

    previousImage() {
        let current = this.state.current;
        let imageArray = this.state.background.length - 1;

        if(current >= 1) {
          this.setState({ current: current - 1 })
        }
        if(current === 0) {
          this.setState({ current: imageArray })
        }
    }

    nextImage() {
        let current = this.state.current;
        let imageArray = this.state.background.length - 1;

        if((current >= 0) && (current !== imageArray)) {
          this.setState({ current: current + 1 })
        }
        if(current === imageArray) {
          this.setState({ current: 0 })
        }
    }

    render () {
        // let item = this.props.product;
        // let imageUrl = item.ImageSets[0].ImageSet[this.state.index].LargeImage[0].URL[0];
        // let newArray = [];

        // for (let i =0; i<this.state.index; i++) {
        //     newArray.push(imageUrl);
        // }

        return (
            <div className="col-lg-6 col-sm-12 col-xs-12 itemsResults">
                <img src={this.props.imageUrl}/>
                <span className={this.props.icon} onClick={this.addFavoriteItems}></span>
                <p className="clickAdd">add favorite</p>
                <span className={this.props.icon2} onClick={this.deleteFavoriteItems}></span>
                <p className="removeFavorite">Remove favorite</p>
                <span className="price">{this.props.price}</span>
                <span className={this.props.leftArrow} onClick={this.previousImage}></span>
                <span className={this.props.rightArrow} onClick={this.nextImage}></span>
                <a href={this.props.pageUrl} target={this.props.blank}><img src={this.props.amazonLogoUrl} className="amazonLogo"/></a>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        favorites: state.favorites,
        searchResults: state.searchResults,
        authenticated: localStorage.authHeaders,
    }
} 

export default connect(mapStateToProps)(ItemViews);
