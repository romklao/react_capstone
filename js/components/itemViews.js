import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

class ItemView extends React.Component {
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
            <div className="col-lg-6 col-sm-12 col-xs-12 itemsResults">
                <img src={this.props.imageUrl} />
                <span className={this.props.icon} onClick={this.addFavorites}></span>
                <p className="price">{this.props.price}</p>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        favorites: state.favorites,
    }
} 

export default connect(mapStateToProps)(ItemView);
