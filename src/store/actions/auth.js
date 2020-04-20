import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSucess = (authData) => {
    return {
        type: actionTypes.AUTH_START,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_START,
        error: error
    }
}

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        // Auth user...
    }
}