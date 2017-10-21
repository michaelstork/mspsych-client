import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import auth from './auth';
import notifications from './notifications';

let store = createStore(
	combineReducers({
		auth,
		notifications
	}),
	applyMiddleware(thunkMiddleware)
);

export default store;