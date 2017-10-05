import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(function (config) {
	const token = localStorage.getItem('mspsychToken');
	if (token) config.headers.common['Authorization'] = 'Bearer ' +  token;
	return config;
}, function (error) {
	return Promise.reject(error);
});

export default instance;