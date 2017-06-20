import {Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';


export const SEARCH_SUBMIT = 'SEARCH_SUBMIT';
export const makeSearchSubmitMsg = searchInput => ({
    type: SEARCH_SUBMIT,
    searchInput: searchInput
})

export const SHOW_SIGNUP = 'SHOW_SIGNUP';
export const showSignup = () => ({
    type: SHOW_SIGNUP
})

export const SHOW_LOGIN = 'SHOW_LOGIN';
export const showLogin = () => ({
    type: SHOW_LOGIN
})

export const HIDE = 'HIDE';
export const hide = () => ({
    type: HIDE
})

export const ADD_FAVORITE_ITEMS = 'ADD_FAVORITE_ITEMS';
export const addFavoriteItems = () => ({
    type: ADD_FAVORITE_ITEMS
})

export const signupForm = (newUserData) => dispatch => {
    console.log('postSignup', newUserData)
    let url = '/signup';
    let fetchData = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserData),
    }
    return fetch(url, fetchData).then(response => {
        console.log('response', response.body)
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(data => {
        console.log('response2', data);
        localStorage.authHeaders = fetchData.headers.Authorization;
        hashHistory.push('/user');
        $('.indexPage').hide();
        return dispatch(signupSuccess(data.username));
    })
    .catch(error => {
        console.log('error1', error.message)
        return dispatch(signupError(error.message));
    })
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    user: user
})

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const signupError = (error) => ({
    type: SIGNUP_ERROR,
    error: error
})

export const loginForm = (email, password) => dispatch => {
    console.log('login', email, password);

    let url = '/login';
    let fetchData = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + btoa(email + ":" + password),
            },
    }
    return fetch(url, fetchData).then(response => {
        console.log('response', response.body)
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(data => {
        localStorage.authHeaders = fetchData.headers.Authorization;
        hashHistory.push('/user');
        $('.indexPage').hide();
        console.log('data', data);
        return dispatch(loginSuccess(data.user.username));
    })
    .catch(error => {
        console.log('error1', error.message)
        return dispatch(loginError(error.message));
    })
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user: user
})

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = error => ({
    type: LOGIN_ERROR,
    error: error
})

export const logout = () => dispatch => {
    localStorage.removeItem('authHeaders');
    //hashHistory.push('/');
    window.location = '/';
}

export const LOG_OUT_USER = 'LOG_OUT_USER';
export const logoutUser = () => ({
    type: LOG_OUT_USER
})

export const searchSubmit = (search_text, page) => dispatch => {
    let url = `/amazon/${search_text}?page=${page}`;
    let fetchData = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
    }
    return fetch(url, fetchData).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(data => {
        console.log('Apidata', data);
        hashHistory.push('/search_results');
        $('.indexPage').hide();
        return dispatch(makeSearchSuccessMsg(data, search_text, page));
    })
    .catch(error => {
        console.log('error1', error.message)
        return dispatch(searchError(error.message));
    })
}

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const makeSearchSuccessMsg = (searchResults, searchInput, page) => ({
    type: SEARCH_SUCCESS,
    searchResults: searchResults,
    searchInput: searchInput,
    page: page
})

export const SEARCH_ERROR = 'SEARCH_ERROR';
export const searchError = error => ({
    type: SEARCH_ERROR,
    error: error,
})






















