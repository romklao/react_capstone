import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

class SignupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
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
        this.props.dispatch(actions.signupForm(this.state));
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
                <div className="modal-signup">
                    <h4 className="errorMessage">{this.props.errorMessage}</h4>
                    <form onSubmit={this.onSubmit}>
                        <h4 className="modal-title">Fill out the information below to Sign up</h4>
                        <div>
                            <input type="text" name="username" value={this.state.username} onChange={this.onChange} className="signup_input signup" placeholder="Username" />
                            <input type="email" name="email" value={this.state.email} onChange={this.onChange} className="signup_input signup" placeholder="Email address" />
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" className="signup_input signup" />
                            <input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.onChange} className="signup_input signup signup_confirm" placeholder="Confirm password" />
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

export default connect(mapStateToProps)(SignupModal);
