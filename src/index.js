import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import cloneDeep from 'lodash/cloneDeep';

const initialAuthState = {
	user: null,
	inProgress: true,
	logoutMessage: ''
};

function authReducer(state = initialAuthState, action) {
	switch (action.type) {
		case 'REQUEST_AUTH':
			return Object.assign({}, state, {inProgress: true, logoutMessage: ''});
		case 'RECEIVE_AUTH':
			return Object.assign({}, state, {inProgress: false, user: action.payload});
		case 'AUTH_ERROR':
			return Object.assign({}, state, {inProgress: false, user: null});
		case 'LOGOUT':
			return Object.assign({}, state, {inProgress: false, user: null, logoutMessage: action.payload});
		case 'CLEAR_LOGOUT_MESSAGE':
			return Object.assign({}, state, {logoutMessage: null});
		default:
			return state;
	}
}

const initialNotificationsState = [];

function notificationsReducer(state = initialNotificationsState, action) {
	switch (action.type) {
		case 'ADD_NOTIFICATION':
			const existing = state.find(notification => notification.content === action.payload);

			if (existing) { // increment notification if already exists
				const notifications = cloneDeep(state);
				const index = notifications.findIndex(item => item.id === existing.id);
				notifications[index].count++;
				return notifications;

			} else { // otherwise add it
				return state.concat([{id: Date.now(), content: action.payload, count: 1}]);
			}
		case 'CLEAR_NOTIFICATION':
			return state.filter(item => item.id !== action.payload);
		default:
			return state;
	}
}

let store = createStore(
	combineReducers({
		auth: authReducer,
		notifications: notificationsReducer
	}),
	applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
