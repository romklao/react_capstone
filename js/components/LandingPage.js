import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Masonry from 'react-masonry-component';

var masonryOptions = {
    itemSelector: '.box',
    transitionDuration: 0,
    columnWidth: 320,
    isFitWidth: true,
    gutter: 10,
};

function LandingPage(props) {
    return (
        <div>
            <div className="row landing">
                <div className="col-lg-6 col-xs-12 intro">
                    <h1>FIND BESTSELLING PRODUCTS FROM AMAZON</h1>
                    <p>Highly recommended by users</p>
                </div>
                <div className="col-lg-6 col-xs-12 introImg">
                </div>
            </div>
            <h1 className="bestselling">Amazon Best Sellers</h1>
            <Masonry
                className={'my-gallery-class'} 
                elementType={'div'} 
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
            >
                <div className="grid">
                    <div className="box kindle">
                        <a href="https://www.amazon.com/Amazon-Kindle-Paperwhite-6-Inch-4GB-eReader/dp/B00OQVZDJM/
                        ref=zg_bs_electronics_8?_encoding=UTF8&psc=1&refRID=2KYTJYRFTFTVV2AY0T35" target="_blank"></a>
                    </div>
                    <div className="box echo">
                        <a href="https://www.amazon.com/Amazon-Echo-Dot-Portable-Bluetooth-Speaker-with-Alexa-White/dp/B015TJD0Y4/
                        ref=zg_bs_electronics_7?_encoding=UTF8&psc=1&refRID=2KYTJYRFTFTVV2AY0T35" target="_blank"></a>
                    </div>
                    <div className="box category">
                        <div>
                            <h1>Electronics</h1>
                        </div>
                    </div>
                    <div className="box speaker">
                        <a href="https://www.amazon.com/DOSS-Wireless-Bluetooth-Portable-Speaker/dp/B01CQOV3YO/
                        ref=zg_bs_electronics_28?_encoding=UTF8&psc=1&refRID=XDKGWRMP7YKZNW5HAANZ" target="_blank"></a>
                    </div>
                    <div className="box tv">
                        <a href="https://www.amazon.com/HP-Pavilion-22cwa-21-5-inch-Backlit/dp/B015WCV70W/
                        ref=zg_bs_electronics_21?_encoding=UTF8&psc=1&refRID=71HK07CZ0HB1PK7GPX6R" target="_blank"></a>
                    </div>
                    <div className="box clay">
                        <a href="https://www.amazon.com/Aztec-Secret-Indian-Healing-Cleansing/dp/B0014P8L9W/
                        ref=zg_bs_beauty_1?_encoding=UTF8&psc=1&refRID=2H3845NQ5H3TJG506F3Y" target="_blank"></a>
                    </div>
                    <div className="box category">
                        <div>
                            <h1>Beauty</h1>
                        </div>
                    </div>
                    <div className="box olay">
                        <a href="https://www.amazon.com/Olay-Regenerist-Regenerating-Anti-Aging-Fragrance/dp/B0081NLR0K/
                        ref=sr_1_9_s_it?s=beauty&ie=UTF8&qid=1509159586&sr=1-9&keywords=serum&th=1" target="_blank"></a>
                    </div>
                    <div className="box truskin">
                        <a href="https://www.amazon.com/TruSkin-Naturals-Vitamin-Anti-Aging-Hyaluronic/dp/B01M4MCUAF/
                        ref=sr_1_4_s_it?s=beauty&ie=UTF8&qid=1509159586&sr=1-4&keywords=serum&th=1" target="_blank"></a>
                    </div>
                    <div className="box eyegel">
                        <a href="https://www.amazon.com/Baebody-Circles-Puffiness-Wrinkles-Bags/dp/B01K2UMMI0/
                        ref=zg_bs_beauty_3?_encoding=UTF8&psc=1&refRID=SMFS4TNS2CWSDDTAAQN6" target="_blank"></a>
                    </div>
                    <div className="box waterPick">
                        <a href="https://www.amazon.com/Waterpik-Accepted-WP-660-Aquarius-Flosser/dp/B00HFQQ0VU/
                        ref=zg_bs_beauty_24?_encoding=UTF8&refRID=DQ3ZEAE0YTXZ4DRK2XH4&th=1" target="_blank"></a>
                    </div>
                </div>
            </Masonry>
        </div>
    );
}

export default connect()(LandingPage);
