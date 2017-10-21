import cloneDeep from 'lodash/cloneDeep';

const initialState = [];

function notifications(state = initialState, action) {
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

export default notifications;