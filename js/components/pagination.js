import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';


function Pagination(props) {
    return (
        <div className="col-lg-12 col-sm-12" >
            <ul className="pagination">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">&raquo;</a></li>
            </ul>
        </div>
    );
}

export default connect()(Pagination);


