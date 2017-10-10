import React from 'react';

function isAdmin(user) {
	return (user && user.isAdmin);
}

function renderLink(file) {
	return file.url
		? (
			<a target="_blank" href={file.url}>
				<i className="material-icons">link</i>
				<span>{file.title}</span>
			</a>
		) : (
			<a target="_blank" href={'/api/storage/documents/' + file.filename}>
				<i className="material-icons">description</i>
				<span>{file.title}</span>
			</a>
		);
}

const FileGroup = (props) => (
	<div className="file-group panel-item">
		{isAdmin(props.user)
			&& <i onClick={() => props.deleteCategory(props.category.id)} className="material-icons">clear</i>}
		<h4>{props.category.title}</h4>
		<ul>
			{props.category.document.map(file =>
				<li key={file.id}>
					{isAdmin(props.user)
						&& <i onClick={() => props.deleteFile(file.id)} className="material-icons">clear</i>}
					{renderLink(file)}
				</li>
			)}
		</ul>
	</div>
)

export default FileGroup;