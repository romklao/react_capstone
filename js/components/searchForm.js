import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitSearchForm = this.submitSearchForm.bind(this);
    }

    submitSearchForm(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input type="text" className="form-control input-md" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default btn-md">Submit</button>
            </form>
        );
    };
};

export default connect()(SearchForm);





