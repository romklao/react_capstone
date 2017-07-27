import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        
        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.hide = this.hide.bind(this);
    }

    submitLoginForm(event) {
        event.preventDefault();
        var addEmail = this.addEmailInput.value;
        this.addEmailInput.value = '';

        var addPassword = this.addPasswordInput.value;
        this.addPasswordInput.value = '';

        this.props.dispatch(actions.loginForm(addEmail, addPassword));
    }

    hide(event) {
        event.preventDefault();
        this.props.dispatch(actions.hide());
    };

    render() {
        return (
            <div className="overlay">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.hide}>&times;</button>
                            <h4 className="modal-title">Fill out the information below to log in</h4>
                        </div>
                        <form onSubmit={this.submitLoginForm}>
                            <h4 className="errorMessage">{this.props.errorMessage}</h4>
                            <div className="modal-body">
                                <input type="text" ref={element => this.addEmailInput = element} className="form-control login_input login_email" placeholder="Username" value="rom1@gmail.com"/>
                                <input type="password" ref={element => this.addPasswordInput = element} className="form-control login_input login_pass" placeholder="Password" value="123"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default closeBtn" data-dismiss="modal" onClick={this.hide}>Close</button>
                                <button type="submit" className="btn btn-default submitBtn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    errorMessage: state.errorMessage,
});


export default connect(mapStateToProps)(LoginModal);
