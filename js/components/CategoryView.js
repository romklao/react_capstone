import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import {Link} from 'react-router';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';

export function CategoryView(props) {
    let getSearchProduct = event => {
        event.preventDefault();
        hashHistory.push(`/search?category=${props.category}&keywords=${props.keywords}&page=1`);
        window.scrollTo(0, 0)
    }
    let styleData = props.styleData;
    let keywords = props.keywords;

    return (
        <div className="col-lg-4 col-sm-6 col-xs-12">
            <p className="keywords">{keywords}</p>
            <div className="wrapper">
                <div className={styleData.parentClass} onClick={getSearchProduct}>
                    <div className={styleData.bgClass}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect()(CategoryView)