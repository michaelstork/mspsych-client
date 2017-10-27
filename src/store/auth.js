import assign from 'lodash/assign';

const initialState = {
	user: null,
	inProgress: true
};

function auth(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_AUTH':
			return assign({}, state, {inProgress: true});
		case 'RECEIVE_AUTH':
			return assign({}, state, {inProgress: false, user: action.payload});
		case 'AUTH_ERROR':
			return assign({}, state, {inProgress: false, user: null});
		case 'LOGOUT':
			return assign({}, state, {inProgress: false, user: null});
		default:
			return state;
	}
}

export default auth;