import React from 'react';
import Panel from '../../components/Panel/Panel';
import axios from 'axios';
import './Home.css';
import Moment from 'react-moment';

class Home extends React.Component {
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
		});
	}

	render() {
		return (
			<Panel className="news-panel">
				<h2>News &amp; Information</h2>
				<div>
					{this.state.news.map(item =>
						<div className="news-item" key={item.news_id}>
							<h4>{item.news_title}</h4>
							<p className="news-item-author">
								{item.user.user_email} on <Moment format="dddd\, MMM Do \a\t h:mm A">{item.news_created}</Moment>
							</p>
							<p className="news-item-content" dangerouslySetInnerHTML={{__html: item.news_content}} />
						</div>
					)}
				</div>
			</Panel>
		);
	}
}

export default Home;