import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';





const initialState = {
	user: null
};

function auth(state = initialState, action) {
	console.log(action);
	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, {user: action.payload});
		case 'LOGOUT':
			return Object.assign({}, state, {user: null});
		default:
			return state;
	}
}

let store = createStore(auth);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
