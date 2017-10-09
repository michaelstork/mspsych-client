import React from 'react';
import './News.css';
import axios from '../../../connection/axios';

class News extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			news: []
		};
	}

	componentDidMount() {
		axios.get('/api/news').then(response => {
			this.setState({
				news: response.data
			});
		}).catch(error => {
			console.log(error.message);
		});
	}

	render() {
		return (
			<section>
				<h2>News</h2>
				<div className="admin-news-content">

				</div>
			</section>
		);
	}
}

export default News;