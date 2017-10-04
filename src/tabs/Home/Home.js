import React from 'react';
import Panel from '../../components/Panel/Panel';
import './Home.css';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			news: []
		};
	}

	componentDidMount() {
		fetch('http://mspsych.localhost/api/news').then(data => {
			console.log(data.json);
			this.setState({
				news: data.json
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