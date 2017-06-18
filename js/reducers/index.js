import * as actions from '../actions/index';
import { handle } from 'redux-pack';

const initialState = {
    showLogin: false,
    showSignup: false,
    loggedIn: false,
    authenticated: false,
    shouldRedirect: false,
    errorMessage: null,
    successMessage: null,
    displayInformation: [],
    favoriteItems: [],
    user: null
}

export const decorHomeReducer = function(state, action) {
    state = state || initialState;
 
    if (action.type === actions.SHOW_SIGNUP) {
        state = Object.assign({}, 
            state, {
                showSignup: true
            } 
        );
        return state;

    } else if (action.type === actions.HIDE_SIGNUP) {
        state = Object.assign({}, 
            state, {
                showSignup: false
            } 
        );
        return state;

    } else if (action.type === actions.SHOW_LOGIN) {
        state = Object.assign({}, 
            state, {
                showLogin: true
            } 
        );
        return state;

    } else if (action.type === actions.HIDE_LOGIN) {
        state = Object.assign({}, 
            state, {
                showLogin: false
            } 
        );
        return state;
    } else if (action.type === actions.SIGNUP_SUCCESS) {
        var successMessage = 'Welcome'
        state = Object.assign({},
            state, {
                user: action.user,
                loggedIn: true,
                authenticated: true,
                shouldRedirect: true,
                showSignup: false,
                showLogin: false,
            }
        );
        console.log('SIGNUP state', state, 'SIGNUP action', action)
        return state;
    } else if (action.type === actions.SIGNUP_ERROR) {
        state = Object.assign({},
            state, {
                loggedIn: false,
                shouldRedirect: false,
                errorMessage: action.error
            }
        );
        console.log('SIGNUP state', state, 'SIGNUP action', action)
        return state;
    } else if (action.type === actions.LOGIN_SUCCESS) {
        state = Object.assign({},
            state, {
                user: action.user,
                loggedIn: true,
                authenticated: true,
                shouldRedirect: true,
                showLogin: false,
                showSignup: false,
            }
        );
        console.log('LOGIN state', state, 'LOGIN action', action)
        return state;
    } else if (action.type === actions.LOGIN_ERROR) {
        state = Object.assign({},
            state, {
                loggedIn: false,
                shouldRedirect: false,
                errorMessage: action.error
            }
        );
        console.log('LOGIN state', state, 'LOGIN action', action)
        return state;
    }
    console.log('state', state, 'action' , action)
    return state;
}












