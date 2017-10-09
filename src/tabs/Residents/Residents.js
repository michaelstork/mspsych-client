import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Panel from '../../components/Panel/Panel';
import './Residents.css';
import axios from '../../connection/axios';

class Residents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	componentDidMount() {
		axios.get('/api/document-categories').then(response => {
			this.setState({
				categories: response.data
			});
		});
	}

	render() {
		return (
			<Panel className="residents-panel">
				<h2>Files for Residents</h2>
				<div className="file-groups">
					<TransitionGroup>
						{this.state.categories.map(category => 
							<CSSTransition timeout={200} classNames="fade" key={category.id}>
								<div className="file-group">
									<h3>{category.title}</h3>
									<ul>
										{category.document.map(file =>
											<li key={file.id}>
												<a target="_blank" href={'/api/storage/documents/' + file.filename}>
													{file.title}
												</a>
											</li>
										)}
									</ul>
								</div>
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</Panel>
		);
	}
}

export default Residents;

