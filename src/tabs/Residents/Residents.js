import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Panel from '../../components/Panel/Panel';
import CreateCategory from '../../partials/Residents/CreateCategory';
import UploadFile from '../../partials/Residents/UploadFile';
import FileGroup from '../../partials/Residents/FileGroup';
import './Residents.css';
import axios from '../../connection/axios';

class Residents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			showUpload: false,
			showCreateCategory: false
		};

		this.toggleUpload         = this.toggleUpload.bind(this);
		this.toggleCreateCategory = this.toggleCreateCategory.bind(this);
		this.createCategory       = this.createCategory.bind(this);
		this.deleteCategory       = this.deleteCategory.bind(this);
	}

	componentDidMount() {
		axios.get('/api/document-categories').then(response => {
			this.setState({
				categories: response.data
			});
		});
	}

	uploadFile(categoryId) {
		console.log('upload file to category: '+categoryId);
	}

	deleteCategory(id) {
		if (!window.confirm('Are you sure you want to delete this category and all it\'s files?')) return;

		axios.delete('/api/document-categories/'+id).then(response =>
			this.setState(Object.assign(
				{},
				this.state,
				{categories: this.state.categories.filter(category => category.id !== id)}
			))
		).catch(error => {
			console.log(error);
		})
	}

	createCategory(title) {
		axios.post(
			'/api/document-categories',
			{title: title}
		).then(response => {
			const categories = this.state.categories.slice();
			categories.unshift(response.data);
			this.setState(Object.assign({}, this.state, {categories: categories, showCreateCategory: false}));
		}).catch(error => {
			console.log(error);
		});
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
				<div className="residents-panel-content panel-content">
					<CSSTransition
						in={this.state.showCreateCategory}
						classNames="toggle-create"
						mountOnEnter={true}
						unmountOnExit={true}
						timeout={500}>
						<CreateCategory create={this.createCategory} cancel={this.toggleCreateCategory} />
					</CSSTransition>

					<CSSTransition
						in={this.state.showUpload}
						classNames="toggle-upload"
						mountOnEnter={true}
						unmountOnExit={true}
						timeout={500}>
						<UploadFile upload={this.uploadFile} cancel={this.toggleUpload} categories={this.state.categories} />
					</CSSTransition>

					<TransitionGroup>
						{this.state.categories.map(category => 
							<CSSTransition timeout={200} classNames="fade" key={category.id}>
								<FileGroup category={category} user={this.props.user} delete={this.deleteCategory} />
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</Panel>
		);
	}
}

export default Residents;

