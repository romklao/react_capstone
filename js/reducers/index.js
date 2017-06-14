import * as actions from '../actions/index';

const initialState = {
    showLogin: false,
    showSignup: false,
    displayInformation: [],
    favoriteItems: [],
}

export const decorHomeReducer = function(state, action) {
    state = state || initialState;
    console.log(state, action)
    if (action.type === actions.RETURN_TO_HOME) {
        state = initialState
        return state;

    } else if (action.type === actions.SHOW_SIGNUP) {
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

    } else if (action.type === actions.SHOW_LOGIN) {
        state = Object.assign({}, 
            state, {
                showLogin: false
            } 
        );
        return state;
    }
    console.log('state', state)
    return state;
}












