import React from 'react';
import './News.css';
import axios from '../../../connection/axios';
import Moment from 'react-moment';

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
					{this.state.news.map(item =>
						<div className="news-item" key={item.id}>
							<h4>{item.title}</h4>
							<p className="news-item-author">
								{item.user.email} on <Moment format="dddd\, MMM Do \a\t h:mm A">{item.created_at}</Moment>
							</p>
							<p className="news-item-content" dangerouslySetInnerHTML={{__html: item.content}} />
						</div>
					)}
				</div>
			</section>
		);
	}
}

export default News;