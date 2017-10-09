import React from 'react';
// import {TransitionGroup} from 'react-transition-group';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Panel from '../../components/Panel/Panel';
import axios from '../../connection/axios';
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
		}).catch(error => {
			console.log(error.message);
		});
	}

	deleteNews(id) {
		axios.delete('/api/news/'+id)
			.then(response => {
				this.setState({news: this.state.news.filter(item => item.id !== id)});
			}).catch(error => {
				console.log(error);
			})
	}

	render() {
		return (
			<Panel className="news-panel">
				<h2>News &amp; Information</h2>
				<div>
					<TransitionGroup>
						{this.state.news.map((item) =>
							<CSSTransition {...this.props} timeout={300} classNames="fade" in={this.state.show} key={item.id}>
								<div className="news-item">
									{this.props.user && this.props.user.isAdmin
										&& <i onClick={() => this.deleteNews(item.id)} className="material-icons">clear</i>}
									<h4>{item.title}</h4>
									<p className="news-item-author">
										{item.user.email} on <Moment format="dddd\, MMM Do \a\t h:mm A">{item.created_at}</Moment>
									</p>
									<p className="news-item-content" dangerouslySetInnerHTML={{__html: item.content}} />
								</div>
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</Panel>
		);
	}
}

export default Home;