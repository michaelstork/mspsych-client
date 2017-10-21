
/**
 * Action Creators
 */

function notify(notification) {
    return {type: 'ADD_NOTIFICATION', payload: notification};
}

function clear(index) {
	return {type: 'CLEAR_NOTIFICATION', payload: index};
}

function increment(id) {
	return {type: 'INCREMENT_NOTIFICATION', payload: id};
}


/**
 * Actions
 */

export default {
	notify: notify,
	clear: clear,
	increment: increment
}