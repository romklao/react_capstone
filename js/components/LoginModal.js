import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'demo@testing.com',
            password: '123'
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.hide = this.hide.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.dispatch(actions.loginForm(this.state));
    }

    hide(event) {
        event.preventDefault();
        this.props.dispatch(actions.hide());
    };

    render() {
        return (
            <div className="overlay">
                <div>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.hide}>&times;</button>
                </div>
                <div className="modal-login">
                    <h4 className="errorMessageLogin">{this.props.errorMessage}</h4>
                    <form onSubmit={this.onSubmit}>
                        <h4 className="modal-title" >Fill out the information below to log in</h4>
                        <div>
                            <input type="text" name="email" value={this.state.email} onChange={this.onChange} className="login_input login_email" placeholder="Username" />
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange} className="login_input login_pass" placeholder="Password" />
                        </div>
                        <div>
                            <button type="button" className="btn btn-default closeBtn" data-dismiss="modal" onClick={this.hide}>Close</button>
                            <button type="submit" className="btn btn-default submitBtn">Submit</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    errorMessage: state.errorMessage,
});


export default connect(mapStateToProps)(LoginModal);
