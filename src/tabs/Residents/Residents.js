import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Panel from '../../components/Panel/Panel';
import FileGroup from '../../partials/Residents/FileGroup';
import './Residents.css';
import axios from '../../connection/axios';

class Residents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			showUpload: false,
			showCategory: true
		};

		this.toggleUpload = this.toggleUpload.bind(this);
		this.toggleCreateCategory = this.toggleCreateCategory.bind(this);
	}

	componentDidMount() {
		axios.get('/api/document-categories').then(response => {
			this.setState({
				categories: response.data
			});
		});
	}

	uploadFile(categoryId) {
		console.log(categoryId);
	}

	toggleUpload() {
		this.setState(Object.assign({}, this.state, {showUpload: !this.state.showUpload,}));
	}

	toggleCreateCategory() {
		this.setState(Object.assign({}, this.state, {showCreateCategory: !this.state.showCreateCategory,}));
	}

	renderUploadButton() {
		return (
			<div onClick={() => {!this.state.showCreateCategory && this.toggleUpload()}} disabled={this.state.showCreateCategory}>
				<span>Upload File</span>
				<i className="material-icons">
					{this.state.showUpload
						? 'remove_circle'
						: 'cloud_circle'
					}
				</i>
			</div>
		);
	}

	renderCreateCategoryButton() {
		return (
			<div onClick={() => {!this.state.showUpload && this.toggleCreateCategory()}} disabled={this.state.showUpload}>
				<span>Create Category</span>
				<i className="material-icons">
					{this.state.showCreateCategory
						? 'remove_circle'
						: 'add_circle'
					}
				</i>
			</div>
		);
	}

	render() {
		return (
			<Panel className="residents-panel with-items">
				<h2>
					<span>Files for Residents</span>
					{this.props.user && this.props.user.isAdmin && this.renderCreateCategoryButton()}
					{this.props.user && this.props.user.isAdmin && this.renderUploadButton()}
				</h2>
				<div className="file-groups">
					<TransitionGroup>
						{this.state.categories.map(category => 
							<CSSTransition timeout={200} classNames="fade" key={category.id}>
								<FileGroup category={category} user={this.props.user} upload={this.uploadFile} />
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</Panel>
		);
	}
}

export default Residents;

