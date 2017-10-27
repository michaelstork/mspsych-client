import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Panel from '../../components/Panel/Panel';
import CreateNews from '../../partials/News/CreateNews';
import NewsItem from '../../partials/News/NewsItem';
import axios from '../../connection/axios';
import cloneDeep from 'lodash/cloneDeep';
import './Home.css';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [],
			showCreate: false
		};

		this.toggleCreate = this.toggleCreate.bind(this);
		this.createNews   = this.createNews.bind(this);
		this.deleteNews   = this.deleteNews.bind(this);

		switch (process.env.REACT_APP_ENV) {
			case 'development':
				this.calendarUrl = 'http://mspsych.localhost/api/calendar?src=mspsychclerkship%40gmail.com&mode=WEEK&ctz=America/New_York';
				break;
			case 'staging':
				this.calendarUrl = 'http://mspsych.mstork.info/api/calendar?src=mspsychclerkship%40gmail.com&mode=WEEK&ctz=America/New_York';
				break;
			case 'production':
				this.calendarUrl = 'http://mspsych.mssm.edu/api/calendar?src=mspsychclerkship%40gmail.com&mode=WEEK&ctz=America/New_York';
				break;
			default:
				break;
		}
	}

	componentDidMount() {
		axios.get(
			'/api/news'
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.news = response.data;
			this.setState(state);
		})
		.catch(error => {
			console.log(error.message);
		});
	}

	deleteNews(id) {
		if (!window.confirm(
			'Are you sure you want to delete this item?'
		)) return;

		axios.delete(
			'/api/news/'+id
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.news = state.news.filter(
				item => item.id !== id
			);

			this.setState(state);
			this.props.notify('News item deleted');

		})
		.catch(error => {
			console.log(error);
		})
	}

	createNews(title, content) {
		axios.post(
			'/api/news',
			{
				title: title,
				content: content
			}
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.news.unshift(response.data);
			state.showCreate = false;

			this.setState(state);
			this.props.notify('News item created');

		})
		.catch(error => {
			console.log(error);
		});
	}

	toggleCreate() {
		const state = cloneDeep(this.state);
		state.showCreate = !state.showCreate;
		this.setState(state);
	}

	renderCreateButton() {
		if (!(this.props.user && this.props.user.isAdmin)) {
			return null;
		}

		return (
			<i onClick={this.toggleCreate}
				className="material-icons">
				{this.state.showCreate
					? 'remove_circle'
					: 'add_circle'
				}
			</i>
		);
	}

	render() {
		return (
			<Panel className="with-items">
				<h2>
					<span>News &amp; Information</span>
					{this.renderCreateButton()}
				</h2>
				<div className="news-panel-content panel-content">
					<CSSTransition
						in={this.state.showCreate}
						classNames="toggle-create"
						mountOnEnter={true}
						unmountOnExit={true}
						timeout={500}>
						<CreateNews
							create={this.createNews}
							cancel={this.toggleCreate} />
					</CSSTransition>

					<TransitionGroup>
						{this.state.news.map((item) =>
							<CSSTransition
								timeout={250}
								classNames="fade"
								key={item.id}>
								<NewsItem
									item={item}
									user={this.props.user}
									delete={this.deleteNews} />
							</CSSTransition>
						)}
						<CSSTransition
							timeout={250}
							classNames="fade">
							<div className="calendar-container">
								<iframe title="Calendar"
									width="864"
									height="600"
									frameBorder="0"
									scrolling="no"
									src={this.calendarUrl}></iframe>
							</div>
						</CSSTransition>
					</TransitionGroup>
				</div>

			</Panel>
		);
	}
}

export default Home;