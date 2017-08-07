import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

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
        this.setState({loading: false});
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
    };
};

export default connect()(SearchForm);





