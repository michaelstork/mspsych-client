import React from 'react';
import Panel from '../../components/Panel/Panel';
import axios from 'axios';
import './Home.css';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			news: []
		};
	}

	componentDidMount() {
		// fetch('http://mspsych.localhost/api/news')
		// 	.then((resp) => resp.json())
		// 	.then(data => {
		// 		console.log(data);
		// 	});

		axios.get('/api/news').then(response => {
			console.log(response.data);
			this.setState({
				news: response.data
			});
		});
	}

	render() {
		return (
			<Panel>
				<h2>News &amp; Information</h2>
			</Panel>
		);
	}
}

export default Home;