import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Downloading from './Downloading';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.submitSearchForm = this.submitSearchForm.bind(this);
    }

    submitSearchForm(event) {
        event.preventDefault();
        var addSearchText = this.addSearchTextInput.value;
        this.addSearchTextInput.value = '';
        this.props.dispatch(actions.searchSubmit(addSearchText, 1));
        this.setState = {
            loading: false
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <Downloading />
            );
        }
        return (
            <form onSubmit={this.submitSearchForm} className="navbar-form navbar-left" role="search">
                <div className="form-group">
                    <input type="text" ref={element => this.addSearchTextInput = element} 
                        className="form-control input-md search_input" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default submitSearch hidden-xs">Submit</button>
                <button type="submit" className="btn btn-default submitSearch visible-xs" data-toggle="collapse" data-target=".navbar-collapse">Submit</button>
            </form>
        );
    };
};

export default connect()(SearchForm);





