import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.hide = this.hide.bind(this);
    }


    hide(event) {
        event.preventDefault();
        props.dispatch(actions.hideLogin());
    }

    submitLoginForm(event) {
        event.preventDefault();
        var addEmail = this.addEmailInput.value;
        this.addEmailInput.value = '';
        this.props.dispatch(actions.inputLogin(addEmail));

        var addPassword = this.addPasswordInput.value;
        this.addPasswordInput.value = '';
        this.props.dispatch(actions.inputLogin(addPassword));
    }

    render() {
        return (
            // <div className="modal overlay">
            //     <div className="modal-dialog">
            //         <div className="modal-content">
            //             <div className="modal-header">
            //                 <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.hide}>&times;</button>
            //                 <h4 className="modal-title">Fill out the information below to log in</h4>
            //             </div>
            //             <form onSubmit={this.submitLoginForm}>
            //                 <div className="modal-body">
            //                     <input type="email" ref={element => this.addEmailInput = element} id="login_email" className="form-control login_input" name="email" placeholder="Email address" />
            //                     <input type="password" ref={element => this.addPasswordInput = element} id="login_password" className="form-control login_input" placeholder="Password" />
            //                 </div>
            //                 <div className="modal-footer">
            //                     <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.hide}>Close</button>
            //                     <button type="button" className="btn btn-primary">Submit</button>
            //                 </div>
            //             </form>
            //         </div>
            //     </div>
            // </div>
            <div className="overlay" id="modal">
                <div className="content">
                    <div className="header">
                        <button type="button" className="close" onClick={this.hide}>&times;</button>
                        <p className="titleLogin">Fill out the information below to log in</p>
                    </div>
                    <div>
                        <form onSubmit={this.submitLoginForm}>
                             <div className="body">
                                <input type="email" ref={element => this.addEmailInput = element} id="login_email" className="form-control login_input" name="email" placeholder="Email address" />
                                 <input type="password" ref={element => this.addPasswordInput = element} id="login_password" className="form-control login_input" placeholder="Password" />
                             </div>
                             <div className="footer">
                                 <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.hide}>Close</button>
                                 <button type="button" className="btn btn-primary">Submit</button>
                             </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default connect()(LoginModal);
