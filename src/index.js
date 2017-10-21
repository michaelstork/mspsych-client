import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
