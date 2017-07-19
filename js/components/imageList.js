import React from 'react';
import {connect} from 'react-redux';

import ShowImage from './ShowImage';

export function ImageList(props) {
    return (
        <div>
            <div className="row image-list">
                <ShowImage imageUrl="css/images/chair2.jpg" />
                <ShowImage imageUrl="css/images/sofa2.jpg" />
                <ShowImage imageUrl="css/images/table1.jpg" />
                <ShowImage imageUrl="css/images/clock.jpg" />
            </div>
            <div className="row image-list">
                <ShowImage imageUrl="css/images/drawer.jpg" />
                <ShowImage imageUrl="css/images/light.jpg" />
                <ShowImage imageUrl="css/images/chair3.jpg" />
                <ShowImage imageUrl="css/images/chair6.jpg" />
            </div>
            <div className="row image-list">
                <ShowImage imageUrl="css/images/pillow.jpg" />
                <ShowImage imageUrl="css/images/mirror1.jpg" />
                <ShowImage imageUrl="css/images/crib.jpg" />
                <ShowImage imageUrl="css/images/chair5.jpg" />
            </div>
        </div>
    );
}

export default connect()(ImageList);


