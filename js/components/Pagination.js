import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './SearchForm';
import {Link} from 'react-router';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(pageNum) {
        this.props.dispatch(actions.searchSubmit(this.props.keywords, 
                                                 this.props.category,
                                                 pageNum));
        hashHistory.push(`/search?category=${this.props.category}&keywords=${this.props.keywords}&page=${pageNum}`);
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="btn-toolbar" id="pagination">
                <div className="btn-group">
                    <button type="button" value="1" className="btn btn-default" onClick={() => this.onClick(1)}>1</button>
                    <button type="button" value="2" className="btn btn-default" onClick={() => this.onClick(2)}>2</button>
                    <button type="button" value="3" className="btn btn-default" onClick={() => this.onClick(3)}>3</button>
                    <button type="button" value="4" className="btn btn-default" onClick={() => this.onClick(4)}>4</button>
                    <button type="button" value="5" className="btn btn-default" onClick={() => this.onClick(5)}>5</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    searchInput: state.searchInput,
    category: state.category,

});

export default connect(mapStateToProps)(Pagination);


