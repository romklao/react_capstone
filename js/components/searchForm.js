import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitSearchForm = this.submitSearchForm.bind(this);
    }

    submitSearchForm(event) {
        event.preventDefault();
        var addSearchText = this.addSearchTextInput.value;
        this.addSearchTextInput.value = '';

        var addSearchPage = this.addSearchPageInput.value;
        this.addSearchPageInput.value = '0';

        this.props.dispatch(actions.searchSubmit(addSearchText, addSearchPage));
    }

    render() {
        return (
            <form onSubmit={this.submitSearchForm} className="navbar-form navbar-left" role="search">
                <div className="form-group">
                    <input type="text" ref={element => this.addSearchTextInput = element} 
                        className="form-control input-md search_input" placeholder="Search" />
                    <input type="text" ref={element => this.addSearchPageInput = element} 
                        className="form-control input-md search_input" placeholder="Page" />
                </div>
                <button type="submit" className="btn btn-default btn-md searchSubmit">Submit</button>
            </form>
        );
    };
};

export default connect()(SearchForm);





