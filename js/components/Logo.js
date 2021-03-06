import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './SearchForm';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';

function Logo(props) {
    let returnHome = event => {
        event.preventDefault();
        props.dispatch(actions.returnHome());
        hashHistory.push('/');
    }
    if (props.authenticated) {
        return (
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#" onClick={returnHome}>AmazonBest</a>
            </div>
        );
    } else {
        return (
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#" onClick={returnHome}>AmazonBest</a>
            </div>
        );
    }
    
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    authenticated: localStorage.authHeaders,
});

export default connect(mapStateToProps)(Logo);

