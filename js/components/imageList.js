import React from 'react';
import {connect} from 'react-redux';

import Image from './image';

export function ImageList(props) {
    return (
        <div>
            <div className="row image-list">
                <Image imageUrl="css/images/chair2.jpg" />
                <Image imageUrl="css/images/sofa2.jpg" />
                <Image imageUrl="css/images/table1.jpg" />
                <Image imageUrl="css/images/clock.jpg" />
            </div>
            <div className="row image-list">
                <Image imageUrl="css/images/drawer.jpg" />
                <Image imageUrl="css/images/light.jpg" />
                <Image imageUrl="css/images/chair3.jpg" />
                <Image imageUrl="css/images/chair6.jpg" />
            </div>
            <div className="row image-list">
                <Image imageUrl="css/images/pillow.jpg" />
                <Image imageUrl="css/images/mirror1.jpg" />
                <Image imageUrl="css/images/crib.jpg" />
                <Image imageUrl="css/images/chair5.jpg" />
            </div>
        </div>
    );
}

export default connect()(ImageList);


