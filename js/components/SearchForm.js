import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import { Redirect } from 'react-router'

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitSearchForm = this.submitSearchForm.bind(this);
    }

    submitSearchForm(event) {
        event.preventDefault();
        var addSearchText = this.addSearchTextInput.value;
        this.addSearchTextInput.value = '';
        this.props.dispatch(actions.searchSubmit(addSearchText, 1));
        hashHistory.push('/search');
    }

    render() {
        return (
            <div className="formWrap">
                <form onSubmit={this.submitSearchForm} role="search">
                    <input type="text" ref={element => this.addSearchTextInput = element} 
                        className="input-md search_input" placeholder="Search" />
                    <button type="submit" className="btn btn-default submitSearch">Submit</button>
                </form>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    searchResults: state.searchResults,
});

export default connect(mapStateToProps)(SearchForm);





