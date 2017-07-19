import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export function ShowImage(props) {
    return (
        <div className="col-lg-3 col-sm-6 col-xs-6 imageBox">
            <img src={props.imageUrl} className="imageFurnitures" />
        </div>
    )
}

export default connect()(ShowImage);
