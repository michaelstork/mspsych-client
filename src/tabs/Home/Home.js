import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Panel from '../../components/Panel/Panel';
import CreateNews from '../../partials/News/CreateNews';
import NewsItem from '../../partials/News/NewsItem';
import axios from '../../connection/axios';
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
		if (!window.confirm('Are you sure you want to delete this item?')) return;

		axios.delete('/api/news/'+id).then(response => {
			this.setState(Object.assign(
				{},
				this.state,
				{
					news: this.state.news.filter(item => item.id !== id),
					showCreate: false
				}
			));
		}).catch(error => {
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
		).then(response => {
			const news = this.state.news.slice();
			news.unshift(response.data);
			this.setState(Object.assign({}, this.state, {news: news, showCreate: false}));
		}).catch(error => {
			console.log(error);
		});
	}

	toggleCreate() {
		this.setState(Object.assign({}, this.state, {showCreate: !this.state.showCreate}));
	}

	renderCreateButton() {
		return (
			<i onClick={this.toggleCreate} className="material-icons">
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
					{this.props.user && this.props.user.isAdmin && this.renderCreateButton()}
				</h2>
				<div className="news-panel-content panel-content">
					<CSSTransition
						in={this.state.showCreate}
						classNames="toggle-create"
						mountOnEnter={true}
						unmountOnExit={true}
						timeout={500}>
						<CreateNews create={this.createNews} cancel={this.toggleCreate} />
					</CSSTransition>

					<TransitionGroup>
						{this.state.news.map((item) =>
							<CSSTransition timeout={250} classNames="fade" key={item.id}>
								<NewsItem item={item} user={this.props.user} delete={this.deleteNews} />
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</Panel>
		);
	}
}

export default Home;