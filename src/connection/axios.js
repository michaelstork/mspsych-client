import axios from 'axios';
import store from '../store';
import notificationsActions from '../actions/notifications';
import authActions from '../actions/auth';

const instance = axios.create();

instance.interceptors.request.use(function (config) {
	const token = localStorage.getItem('mspsychToken');
	if (token) config.headers.common['Authorization'] = 'Bearer ' +  token;
	return config;
}, function (error) {
	return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.status === 401) {
		store.dispatch(
			authActions.logout()
		);

		if (error.response.data.error === 'token_expired') {
			store.dispatch(
				notificationsActions.notify(
					'Your session has expired, please log in again.'
				)
			);
		}
		
		window.location.hash = 'account';
	}
	return Promise.reject(error);
});

export default instance;