import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Nav from './Nav';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500);
    }

    render() {
        let { loading } = this.state
        let loginModal;
        let signupModal;

        if(loading) {
            return null;
        }
        if(this.props.showLogin) {
            loginModal = <LoginModal />
        }
        if(this.props.showSignup) {
            signupModal = <SignupModal />
        }
        return (
            <div className="decorHome">
                <Nav/>
                {loginModal}
                {signupModal}
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    showSignup: state.showSignup,
    showLogin: state.showLogin,
    favorites: state.favorites,
});

export default connect(mapStateToProps)(App);
