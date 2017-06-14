import 'isomorphic-fetch';

export const SEARCH_TEXT = 'SEARCH_TEXT';
export const searchText = text => ({
    type: SEARCH_TEXT,
    text: text
})

export const SHOW_SIGNUP = 'SHOW_SIGNUP';
export const showSignup = () => ({
    type: SHOW_SIGNUP
})

export const HIDE_SIGNUP = 'HIDE_SIGNUP';
export const hideSignup = () => ({
    type: HIDE_SIGNUP
})

export const INPUT_SIGNUP = 'INPUT_SIGNUP';
export const inputSignup = (email, password) => ({
    type: INPUT_SIGNUP,
    email: email,
    password: password
})

export const SHOW_LOGIN = 'SHOW_LOGIN';
export const showLogin = () => ({
    type: SHOW_LOGIN
})

export const HIDE_LOGIN = 'HIDE_LOGIN';
export const hideLogin = () => ({
    type: HIDE_LOGIN
})

export const INPUT_LOGIN = 'INPUT_LOGIN';
export const inputLogin = (email, password) => ({
    type: INPUT_LOGIN,
    email: email,
    password: password
})

export const RETURN_TO_HOME = 'RETURN_TO_HOME';
export const returnToHome = () => ({
    type: RETURN_TO_HOME
})

export const ADD_FAVORITE_ITMES = 'ADD_FAVORITE_ITMES';
export const addFavoriteItems = () => ({
    type: ADD_FAVORITE_ITMES
})










