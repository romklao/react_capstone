import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Nav from './Nav';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import ProductQuickViewModal from './ProductQuickViewModal';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1000);
    }

    render() {
        let { loading } = this.state
        let loginModal;
        let signupModal;
        let productQuickViewModal;

        if(loading) {
            return null;
        }
        if(this.props.showLogin) {
            loginModal = <LoginModal />
        }
        if(this.props.showSignup) {
            signupModal = <SignupModal />
        }
        if(this.props.showQuickView) {
            productQuickViewModal = <ProductQuickViewModal />
        }
        return (
            <div className="decorHome">
                <Nav/>
                {loginModal}
                {signupModal}
                <div>
                    {this.props.children}
                    {productQuickViewModal}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    showSignup: state.showSignup,
    showLogin: state.showLogin,
    favorites: state.favorites,
    productDetails: state.productDetails,
    showQuickView: state.showQuickView,
});

export default connect(mapStateToProps)(App);
