import cloneDeep from 'lodash/cloneDeep';
import findLastIndex from 'lodash/findLastIndex';
import findLast from 'lodash/findLast';

const initialState = [];

function notifications(state = initialState, action) {
	switch (action.type) {
		case 'ADD_NOTIFICATION':
			const existing = findLast(state, notification => notification.content === action.payload);

			if (existing && state.indexOf(existing) === (state.length - 1)) {
				// increment notification if already exists and nothing else has been added after
				const notifications = cloneDeep(state);
				const index = findLastIndex(notifications, item => item.content === action.payload);
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