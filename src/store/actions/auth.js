import axios from '../../axios-participants'
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    console.log(expirationTime)
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (login, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            login: login,
            password: password
        };
        let url = 'http://localhost:8080/reactcrudAPI/auth.php'
        if (!isSignup) {
            //url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOuwKt0hQSLiMOXOgSKTKNzjU9PK0FUDI'
        }
        axios.post('auth.php', authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(response.data.expireIn * 1000);
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.id)
                dispatch(authSuccess(response.data.jwt, response.data.id))
                dispatch(checkAuthTimeout((response.data.expireIn - (new Date().getTime() / 1000) )))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}
/*
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
*/
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            }  else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}