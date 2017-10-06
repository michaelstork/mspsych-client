import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'


function authReducer(
	state = {
		user: null,
		inProgress: false
	},
	action
) {
	switch (action.type) {
		case 'REQUEST_AUTH':
			console.log('REQUEST_AUTH');
			return Object.assign({}, state, {inProgress: true});
		case 'RECEIVE_AUTH':
			console.log('RECEIVE_AUTH', action.payload);
			return Object.assign({}, state, {inProgress: false, user: action.payload});
		case 'AUTH_ERROR':
			console.log('AUTH_ERROR', action.payload);
			return Object.assign({}, state, {inProgress: false, user: null});
		default:
			return state;
	}
}

let store = createStore(authReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
