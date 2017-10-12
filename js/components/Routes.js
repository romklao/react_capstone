import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import * as actions from '../actions/index';

import App from './App';
import LandingPageContainer from './LandingPageContainer';
import UserLogin from './User';
import SearchResults from './SearchResults';
import ShowFavorites from './ShowFavorites';
import CategoryViews from './CategoryViews';
import ProductDetails from './ProductDetails';


export function Routes(props) {

    return (
        <Router history={ hashHistory }>
            <Route path="/" component={App} >
                <IndexRoute component={LandingPageContainer} />
                <Route path="user" component={UserLogin} />
                <Route path="myfavorites" component={ShowFavorites} />
                <Route path="search" component={SearchResults}/>
                <Route path="product_details" component={ProductDetails} />
                <Route path="category/:category" component={CategoryViews} />
            </Route>
        </Router>
    );
};

const mapStateToProps = (state, props) => ({
    user: state.user,

});

export default connect(mapStateToProps)(Routes);
