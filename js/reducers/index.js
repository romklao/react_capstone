import * as actions from '../actions/index';
import { handle } from 'redux-pack';

const initialState = {
    isLoading: false,
    showLogin: false,
    showSignup: false,
    showSearchForm: false,
    loggedIn: false,
    shouldRedirect: false,
    authenticated: false,
    returnHome: false,
    showQuickView: false,
    errorMessage: null,
    errorSearchMessage: null,
    searchInput: null,
    category: null,
    searchResults: null,
    productDetails: null,
    favorites: null,
    landingPageHidden: localStorage.authHeaders !== undefined,
    user: localStorage.username ? localStorage.username : null,
}

export const decorHomeReducer = function(state, action) {
    state = state || initialState;
    console.log(action.type, 'TYPE')
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
        return state;

    } else if (action.type === actions.HIDE) {
        state = Object.assign({}, 
            state, {
                showSignup: false,
                showLogin: false,
                showQuickView: false,
            } 
        );
        console.log('hidestate', state)
        return state;

    } else if (action.type === actions.RETURN_HOME) {
        state = Object.assign({}, 
            state, {
                errorSearchMessage: null,
                searchResults: null,
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
                searchInput: action.searchInput,
                isLoading: true
            }
        );
        console.log('state', state)
        return state;

    } else if (action.type === actions.SEARCH_SUCCESS) {
        state = Object.assign({},
            state, {
                errorSearchMessage: null,
                searchResults: action.searchResults,
                searchInput: action.searchInput,
                category: action.category,
                shouldRedirect: true,
                landingPageHidden: true,
                page: action.page,
                isLoading: false
            }
        );
        console.log('stateSuccess', state)
        return state;

    }  else if (action.type === actions.SEARCH_ERROR) {
        var errorSearchMessage = "No results!";
        state = Object.assign({},
            state, {
                favorites: null,
                searchResults: null,
                error: action.error,
                errorSearchMessage: errorSearchMessage,
                isLoading: false
            }
        );
        console.warn('error', action.error);
        return state;

    } else if (action.type === actions.SHOW_PRODUCT_DETAILS) {
        state = Object.assign({},
            state, {
                productDetails: action.productDetails,
            }
        );
        console.log('stateShowProduct', state)
        return state;

    } else if (action.type === actions.SHOW_PRODUCT_QUICK_VIEW) {
        state = Object.assign({},
            state, {
                productDetails: action.productDetails,
                showQuickView: true,
            }
        );
        console.log('stateShowProduct', state)
        return state;

    } else if (action.type === actions.GO_TO_BEAUTY_SEARCH) {
        state = Object.assign({}, 
            state, {
                errorSearchMessage: null,
                searchResults: null,
            } 
        );
        return state;

    } else if (action.type === actions.GO_TO_ELECTRONICS_SEARCH) {
        state = Object.assign({}, 
            state, {
                errorSearchMessage: null,
                searchResults: null,
            } 
        );
        return state;

    } else if (action.type === actions.GO_TO_VITAMINS_SEARCH) {
        state = Object.assign({}, 
            state, {
                errorSearchMessage: null,
                searchResults: null,
            } 
        );
        return state;

    } else if (action.type === actions.GO_TO_BABY_SEARCH) {
        state = Object.assign({}, 
            state, {
                errorSearchMessage: null,
                searchResults: null,
            } 
        );
        return state;

    } else if (action.type === actions.ADD_FAVORITE_SUCCESS) {
        var confirmAddFavoriteMessage = 'Add favorite success!'
        state = Object.assign({},
            state, {
                errorSearchMessage: null,
                favorites: action.products,
                showFavorites: true,
            }
        );
        return state;

    } else if (action.type === actions.GET_FAVORITES_SUCCESS) {
        state = Object.assign({},
            state, {
                favorites: action.products,
                searchResults: null,
                errorSearchMessage: null,
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












