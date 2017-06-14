import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export class SignupModal extends React.Component {
    constructor(props) {
        super(props);
        this.submitSignupForm = this.submitSignupForm.bind(this);
    }

    submitSignupForm(event) {
        event.preventDefault();
        var addUsername = this.addUsernameInput.value;
        this.addUsernameInput.value = '';
        this.props.dispatch(actions.inputSignup(addUsername));

        var addEmail = this.addEmailInput.value;
        this.addEmailInput.value = '';
        this.props.dispatch(actions.inputSignup(addEmail));

        var addPassword = this.addPasswordInput.value;
        this.addPasswordInput.value = '';
        this.props.dispatch(actions.inputSignup(addPassword));

        var addConfirmPassword = this.addConfirmPasswordInput.value;
        this.addConfirmPasswordInput.value = '';
        this.props.dispatch(actions.inputSignup(addConfirmPassword));
    }

    hide(event) {
        event.preventDefault();
        props.dispatch(actions.hideSignup());
    };

    render() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={hide}>&times;</button>
                            <h4 className="modal-title">Fill out the information below to log in</h4>
                        </div>
                        <form onSubmit={this.submitSignupForm}>
                            <div className="modal-body">
                                <input type="text" ref={element => this.addUsernameInput = element} id="login_email" className="form-control signup_input" name="email" placeholder="Username" />
                                <input type="email" ref={element => this.addEmailInput = element} id="login_email" className="form-control signup_input" name="email" placeholder="Email address" />
                                <input type="password" ref={element => this.addPasswordInput = element} id="login_password" className="form-control signup_input" placeholder="Password" />
                                <input type="password" ref={element => this.addConfirmPasswordInput = element} id="login_password" className="form-control signup_input" placeholder="Password" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={hide}>Close</button>
                                <button type="button" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default connect()(SignupModal);
