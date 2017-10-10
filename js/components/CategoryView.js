import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import {Link} from 'react-router';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';

export function CategoryView(props) {
    let getSearchProduct = event => {
        event.preventDefault();
        props.dispatch(actions.searchSubmit(props.keywords, props.category, 1));
        hashHistory.push('/search');
    }
    let styleData = props.styleData;

    return (
        <div className="row wrapper">
            <div className={styleData.parentClass} onClick={getSearchProduct}>
                <div className={styleData.bgClass}></div>
            </div>
        </div>
    )
}

export default connect()(CategoryView)