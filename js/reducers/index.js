import * as actions from '../actions/index';
import { handle } from 'redux-pack';

const initialState = {
    showLogin: false,
    showSignup: false,
    showSearchForm: false,
    loggedIn: false,
    shouldRedirect: false,
    authenticated: false,
    errorMessage: null,
    errorSearchMessage: null,
    confirmAddFavoriteMessage: null,
    searchInput: null,
    searchResults: null,
    favorites: null,
    landingPageHidden: localStorage.authHeaders !== undefined,
    user: localStorage.username ? localStorage.username : null,
}

export const decorHomeReducer = function(state, action) {
    state = state || initialState;
    console.log('state', state)
 
    if (action.type === actions.SHOW_SIGNUP) {
        state = Object.assign({}, 
            state, {
                showSignup: true,
            } 
        );
        return state;

    } else if (action.type === actions.SHOW_LOGIN) {
        state = Object.assign({}, 
            state, {
                showLogin: true,
            } 
        );
        console.log('stateLogin', state)
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
        return state;

    } else if (action.type === actions.SIGNUP_ERROR) {
        state = Object.assign({},
            state, {
                loggedIn: false,
                shouldRedirect: false,
                errorMessage: action.error
            }
        );
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
        return state;

    } else if (action.type === actions.LOGIN_ERROR) {
        state = Object.assign({},
            state, {
                loggedIn: false,
                shouldRedirect: false,
                errorMessage: action.error
            }
        );
        return state;

    } else if (action.type === actions.SEARCH_SUBMIT) {
        state = Object.assign({},
            state, {
                searchInput: action.searchInput
            }
        );
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
        return state;

    }  else if (action.type === actions.SEARCH_ERROR) {
        var errorSearchMessage = "No results!";
        state = Object.assign({},
            state, {
                favorites: null,
                searchResults: null,
                error: action.error,
                errorSearchMessage: errorSearchMessage,
            }
        );
        return state;

    } else if (action.type === actions.ADD_FAVORITE_SUCCESS) {
        var confirmAddFavoriteMessage = 'Add favorite success!'
        state = Object.assign({},
            state, {
                favorites: action.products,
                showFavorites: true,
                confirmAddFavoriteMessage: confirmAddFavoriteMessage
            }
        );
        return state;

    } else if (action.type === actions.GET_FAVORITES_SUCCESS) {
        state = Object.assign({},
            state, {
                favorites: action.products,
            }
        );
        return state;

    }else if (action.type === actions.GET_FAVORITES_ERROR) {
        state = Object.assign({},
            state, {
                error: action.error,
            }
        );
        return state;
        
    } else if (action.type === actions.DELETE_FAVORITES_SUCCESS) {
        state = Object.assign({},
            state, {
                favorites: action.products,
            }
        );
        return state;
    }
    return state;
}












