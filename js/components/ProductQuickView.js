import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import {Link} from 'react-router';

import * as actions from '../actions/index';
import ProductView from './ProductView';

class ProductQuickView extends React.Component {
    constructor(props) {
        super(props);

        this.hide = this.hide.bind(this);
        this.showProductDetails = this.showProductDetails.bind(this);
    }

    hide(event) {
        event.preventDefault();
        this.props.dispatch(actions.hide());
    };

    showProductDetails() {
        this.props.dispatch(actions.showProductDetails(this.props.productDetails));
        this.props.dispatch(actions.hide());
        hashHistory.push(`/product_details?ASIN=${this.props.productDetails.ASIN}`);
        window.scrollTo(0, 0);
    }

    render () {
        if(this.props.productDetails) {
            var fullDetailsLink = <span className="viewFullDetails" onClick={this.showProductDetails}>View Full Details</span>

            return (
                <div className="quickViewOuter">
                    <div className="quickViewMiddle">
                        <div className="quickViewInner">
                            <button type="button" className="closeQuickView" data-dismiss="modal" aria-hidden="true" onClick={this.hide}>&times;</button>
                            <ProductView fullDetailsLink={fullDetailsLink} />
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

export default connect(mapStateToProps)(ProductQuickView);
