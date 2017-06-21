import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

class ImageResults extends React.Component {
    constructor(props) {
        super(props);
        this.addFavorites = this.addFavorites.bind(this);
    }

    addFavorites(event) {
        event.preventDefault();
        this.props.dispatch(actions.addFavorites(this.props.product));
    }

    render () {
        return (
            <div className="col-lg-6 col-sm-12 col-xs-12 imageResults">
                <img src={this.props.imageUrl} />
                <span className={this.props.icon} onClick={this.addFavorites}></span>
            </div>
        );
    }
}

export default connect()(ImageResults);
