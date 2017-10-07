import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'


const initialState = {
	user: null,
	inProgress: false,
	logoutMessage: ''
};

function authReducer(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_AUTH':
			return Object.assign({}, state, {inProgress: true});
		case 'RECEIVE_AUTH':
			return Object.assign({}, state, {inProgress: false, user: action.payload});
		case 'AUTH_ERROR':
			return Object.assign({}, state, {inProgress: false, user: null});
		case 'LOGOUT':
			return Object.assign({}, state, {inProgress: false, user: null, logoutMessage: action.payload});
		default:
			return state;
	}
}

let store = createStore(
	authReducer,
	applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
