import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

function Footer(props) {
    return (
        <div className="footer">
            <h1>Amazonbestsellers</h1>
            <div>
                <a href="mailto:rchai2020@gmail.com" target="_top"><img src="css/images/mail.png" className="mail"/></a>
            </div>
            <div className="footerBottom"></div>
            <p><img src="css/images/copyright.png" className="copyright"/> 2017 <span className="devide">|</span> Romklao Chainuwong</p>
        </div>
    );
}

export default connect()(Footer);
