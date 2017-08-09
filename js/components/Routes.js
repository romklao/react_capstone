import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import * as actions from '../actions/index';

import App from './App';
import LandingPageContainer from './LandingPageContainer';
import UserLogin from './User';
import ShowSearchResults from './SearchResults';
import ShowFavorites from './ShowFavorites';


export function Routes(props) {

    return (
        <Router history={ hashHistory }>
            <Route path="/" component={App} >
                <IndexRoute component={LandingPageContainer} />
                <Route path="user" component={UserLogin} />
                <Route path="myfavorites" component={ShowFavorites} />
                <Route path="search" component={ShowSearchResults} />
            </Route>
        </Router>
    );
};

const mapStateToProps = (state, props) => ({
    user: state.user,

});

export default connect(mapStateToProps)(Routes);
