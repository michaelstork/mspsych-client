import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Panel from '../../components/Panel/Panel';
import CreateCategory from '../../partials/Residents/CreateCategory';
import CreateDocument from '../../partials/Residents/CreateDocument';
import FileGroup from '../../partials/Residents/FileGroup';
import './Residents.css';
import axios from '../../connection/axios';
import cloneDeep from 'lodash/cloneDeep';

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
		this.uploadFile           = this.uploadFile.bind(this);
		this.createLink           = this.createLink.bind(this);
		this.deleteFile           = this.deleteFile.bind(this);

		this.handleCreateCategoryClick    = this.handleCreateCategoryClick.bind(this);
		this.handleCreateDocumentClick    = this.handleCreateDocumentClick.bind(this);
		this.handleCreateDocumentResponse = this.handleCreateDocumentResponse.bind(this);
	}

	componentDidMount() {
		axios.get('/api/document-categories').then(response => {
			this.setState({
				categories: response.data
			});
		});
	}

	createLink(title, categoryId, url) {
		axios.post(
			'/api/documents',
			{
				title: title,
				categoryId: categoryId,
				url: url
			}
		)
		.then(this.handleCreateDocumentResponse)
		.catch(error => {
			console.log(error);
		});
	}

	uploadFile(title, categoryId, file) {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('categoryId', categoryId);
		formData.append('document', file);

		axios.post(
			'/api/documents',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		.then(this.handleCreateDocumentResponse)
		.catch(error => {
			console.log(error);
		});
	}

	handleCreateDocumentResponse(response) {
		const document = response.data;
		const state = cloneDeep(this.state);

		const category = state.categories.find(
			category => category.id === document.category_id
		);
		category.document.push(document);
		state.showUpload = false;

		this.setState(state);
		this.props.notify('Document created');
	}

	deleteFile(id) {
		if (!window.confirm('Are you sure you want to delete this file?')) return;

		axios.delete(
			'/api/documents/'+id
		).then(response => {
			const state = cloneDeep(this.state);

			state.categories = state.categories.map(category => {
				category.document = category.document.filter(
					file => file.id !== id
				);
				return category;
			});

			this.setState(state);
			this.props.notify('Document deleted');

		}).catch(error => {
			console.log(error);
		})
	}

	deleteCategory(id) {
		if (!window.confirm(
			'Are you sure you want to delete this category and all its files?'
		)) return;

		axios.delete(
			'/api/document-categories/'+id
		).then(response => {
			const state = cloneDeep(this.state);

			state.categories = state.categories.filter(
				category => category.id !== id
			);

			this.setState(state);
			this.props.notify('Category deleted');

		}).catch(error => {
			console.log(error);
		})
	}

	createCategory(title) {
		axios.post(
			'/api/document-categories',
			{title: title}
		).then(response => {
			const state = cloneDeep(this.state);

			state.categories.unshift(response.data);
			state.showCreateCategory = false;

			this.setState(state);
			this.props.notify('Category created');

		}).catch(error => {
			console.log(error);
		});
	}

	toggleUpload() {
		const state = cloneDeep(this.state);
		state.showUpload = !state.showUpload;
		this.setState(state);
	}

	toggleCreateCategory() {
		const state = cloneDeep(this.state);
		state.showCreateCategory = !state.showCreateCategory;
		this.setState(state);
	}

	handleCreateCategoryClick() {
		if (!this.state.showUpload) this.toggleCreateCategory();
	}

	handleCreateDocumentClick() {
		if (!this.state.showCreateCategory) this.toggleUpload();
	}

	renderUploadButton() {
		if (!(this.props.user && this.props.user.isAdmin)) {
			return null;
		}

		return (
			<div onClick={this.handleCreateDocumentClick}
				disabled={this.state.showCreateCategory}>
				<span>Create Document</span>
				<i className="material-icons">
					{this.state.showUpload
						? 'remove_circle'
						: 'note_add'
					}
				</i>
			</div>
		);
	}

	renderCreateCategoryButton() {
		if (!(this.props.user && this.props.user.isAdmin)) {
			return null;
		}

		return (
			<div onClick={this.handleCreateCategoryClick}
				disabled={this.state.showUpload}>
				<span>Create Category</span>
				<i className="material-icons">
					{this.state.showCreateCategory
						? 'remove_circle'
						: 'create_new_folder'
					}
				</i>
			</div>
		);
	}

	render() {
		return (
			<Panel className="residents-panel with-items">
				<h2>
					<span>Documents for Residents</span>
					{this.renderCreateCategoryButton()}
					{this.renderUploadButton()}
				</h2>
				<div className="residents-panel-content panel-content">
					<CSSTransition
						in={this.state.showCreateCategory}
						classNames="toggle-create"
						mountOnEnter={true}
						unmountOnExit={true}
						timeout={500}>
						<CreateCategory
							create={this.createCategory}
							cancel={this.toggleCreateCategory} />
					</CSSTransition>

					<CSSTransition
						in={this.state.showUpload}
						classNames="toggle-upload"
						mountOnEnter={true}
						unmountOnExit={true}
						timeout={500}>
						<CreateDocument
							upload={this.uploadFile}
							createLink={this.createLink}
							cancel={this.toggleUpload}
							categories={this.state.categories} />
					</CSSTransition>

					<TransitionGroup>
						{this.state.categories.map(category => 
							<CSSTransition
								timeout={200}
								classNames="fade"
								key={category.id}>
								<FileGroup
									category={category}
									user={this.props.user}
									deleteCategory={this.deleteCategory}
									deleteFile={this.deleteFile} />
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</Panel>
		);
	}
}

export default Residents;

