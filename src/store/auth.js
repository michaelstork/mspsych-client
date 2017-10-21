

const initialState = {
	user: null,
	inProgress: true,
	logoutMessage: ''
};

function auth(state = initialState, action) {
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

export default auth;