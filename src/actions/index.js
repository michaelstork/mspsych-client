import axios from '../connection/axios';

/**
 * Action Creators
 */

function requestAuth() {
    return {type: 'REQUEST_AUTH'};
}

function receiveAuth(user) {
    return {type: 'RECEIVE_AUTH', payload: user};
}

function authError(errorMessage) {
    return {type: 'AUTH_ERROR', payload: errorMessage};
}

function logout() {
    return {type: 'LOGOUT'};
}


/**
 * Actions
 */

export default {
    authenticate: function(email, password) {
        return function (dispatch) {
            dispatch(requestAuth());

            return axios.post(
                '/api/authenticate',
                {
                    email: email,
                    password: password
                }
            )
            .then(response => {
                localStorage.setItem('mspsychToken', response.data.token);
                dispatch(receiveAuth(response.data));
                return response;
            })
            .catch(error => {
                localStorage.removeItem('mspsychToken');
                dispatch(authError(error.message));
                throw(error.response);
            });

        }
    },
    reauthenticate: function() {
        return function (dispatch) {
            return axios.post(
                '/api/authenticate', {}
            )
            .then(response => {
                dispatch(receiveAuth(response.data));
                return response;
            }).catch(error => {
                localStorage.removeItem('mspsychToken');
                dispatch(authError(error.message));
                throw(error.response);
            });
        }
    },
    logout: function() {
        return function (dispatch) {
            dispatch(logout());
            localStorage.removeItem('mspsychToken');
        }
    }
};