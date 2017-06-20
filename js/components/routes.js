import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import * as actions from '../actions/index';

import App from './app';
import HomepageContainer from './homepageContainer';
import UserLogin from './user';
import ShowSearchResults from './searchResults'


export function Routes(props) {

    return (
        <Router history={ hashHistory }>
            <Route path="/" component={App} >
                <IndexRoute component={HomepageContainer} />
                <Route path="user" component={UserLogin} />
                <Route path="search_results" component={ShowSearchResults} />
            </Route>
        </Router>
    );
};

const mapStateToProps = (state, props) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Routes);
