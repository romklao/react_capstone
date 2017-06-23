import * as actions from '../actions/index';
import { handle } from 'redux-pack';

const initialState = {
    showLogin: false,
    showSignup: false,
    loggedIn: false,
    shouldRedirect: false,
    authenticated: false,
    errorMessage: null,
    searchInput: null,
    searchResults: null,
    favorites: null,
    showFavoriteItems: false,
    landingPageHidden: localStorage.authHeaders !== undefined,
    user: localStorage.username ? localStorage.username : null,
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

    } else if (action.type === actions.SHOW_LOGIN) {
        state = Object.assign({}, 
            state, {
                showLogin: true
            } 
        );
        return state;

    } else if (action.type === actions.HIDE) {
        state = Object.assign({}, 
            state, {
                showSignup: false,
                showLogin: false,
            } 
        );
        return state;

    } else if (action.type === actions.SIGNUP_SUCCESS) {
        state = Object.assign({},
            state, {
                user: action.user,
                loggedIn: true,
                authenticated: true,
                shouldRedirect: true,
                landingPageHidden:true,
                showLogin: false,
                showSignup: false,
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
                landingPageHidden:true,
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

    } else if (action.type === actions.SEARCH_SUBMIT) {
        state = Object.assign({},
            state, {
                searchInput: action.searchInput
            }
        );
        console.log('search submit state', state, 'search submit action', action)
        return state;

    } else if (action.type === actions.SEARCH_SUCCESS) {
        state = Object.assign({},
            state, {
                searchResults: action.searchResults,
                searchInput: action.searchInput,
                shouldRedirect: true,
                landingPageHidden: true,
                page: action.page,

            }
        );
        console.log('search state', state, 'search action', action)
        return state;

    }  else if (action.type === actions.SEARCH_ERROR) {
        var errorMessage = "No Results!"
        state = Object.assign({},
            state, {
                error: action.error,
                errorMessage: errorMessage,
            }
        );
        console.log('search state', state, 'search action', action)
        return state;

    } else if (action.type === actions.ADD_FAVORITE_SUCCESS) {
        state = Object.assign({},
            state, {
                favorites: action.products,
            }
        );
        console.log('favorites state', state, 'favorites action', action)
        return state;

    } else if (action.type === actions.GET_FAVORITES_SUCCESS) {
        state = Object.assign({},
            state, {
                favorites: action.products,
                showFavoriteItems: true,
            }
        );
        console.log('showfavorites state', state, 'showfavorites action', action)
        return state;
    }

    console.log('state', state, 'action' , action)
    return state;
}












