import React from 'react';

function isAdmin(user) {
	return (user && user.isAdmin);
}

const FileGroup = (props) => (
	<div className="file-group panel-item">
		{isAdmin(props.user)
			&& <i onClick={() => props.deleteCategory(props.category.id)} className="material-icons">clear</i>}
		<h4>{props.category.title}</h4>
		<ul className={isAdmin(props.user) && 'isAdmin'}>
			{props.category.document.map(file =>
				<li key={file.id}>
					{isAdmin(props.user)
						&& <i onClick={() => props.deleteFile(file.id)} className="material-icons">clear</i>}
					<a target="_blank" href={'/api/storage/documents/' + file.filename}>
						{file.title}
					</a>
				</li>
			)}
		</ul>
	</div>
)

export default FileGroup;