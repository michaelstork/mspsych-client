import React from 'react';

function isAdmin(user) {
	return (user && user.isAdmin);
}

function renderClearCategory(props) {
	if (!isAdmin(props.user)) {
		return null;
	}

	return (
		<i className="material-icons"
			onClick={() => props.deleteCategory(props.category.id)}>
			clear
		</i>
	);
}

function renderClearItem(props, file) {
	if (!isAdmin(props.user)) {
		return null;
	}

	return (
		<i className="material-icons"
			onClick={() => props.deleteFile(file.id)}>
			clear
		</i>
	);
}

function renderLink(file) {
	return file.url
		? (
			<a target="_blank" href={file.url}>
				<i className="material-icons">link</i>
				<span>{file.title}</span>
			</a>
		) : (
			<a target="_blank"
				href={'/api/storage/documents/' + file.filename}>
				<i className="material-icons">description</i>
				<span>{file.title}</span>
			</a>
		);
}

const FileGroup = (props) => (
	<div className="file-group panel-item">
		{renderClearCategory(props)}
		<h4>{props.category.title}</h4>
		<ul>
			{props.category.document.map(file =>
				<li key={file.id}>
					{renderClearItem(props, file)}
					{renderLink(file)}
				</li>
			)}
		</ul>
	</div>
)

export default FileGroup;