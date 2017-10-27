import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Masonry from 'react-masonry-component';

var masonryOptions = {
    itemSelector: '.box',
    transitionDuration: 0,
    columnWidth: 314,
    fitWidth: true,
    gutter: 20
};

function LandingPage(props) {
    return (
        <div>
            <div className="row landing">
                <div className="col-md-6 col-xs-12 intro">
                    <h1>FIND BEST PRODUCTS FROM AMAZON</h1>
                    <p>Highly recommended by users</p>
                </div>
                <div className="col-md-6 col-xs-12 introImg">
                </div>
            </div>
            <Masonry
                className={'my-gallery-class'} 
                elementType={'div'} 
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
            >
                <div className="box kindle"></div>
                <div className="box echo"></div>
                <div className="box ElectronicCate">
                    <h1>Electronics</h1>
                </div>
                <div className="box speaker"></div>
                <div className="box tv"></div>
                <div className="box fireTV"></div>
            </Masonry>
        </div>
    );
}

export default connect()(LandingPage);
