import React from 'react';

const FileGroup = (props) => (
	<div className="file-group panel-item">
		{props.user && props.user.isAdmin
			&& <i onClick={() => props.deleteCategory(props.category.id)} className="material-icons">clear</i>}
		<h4>{props.category.title}</h4>
		<ul className={props.user && props.user.isAdmin && 'isAdmin'}>
			{props.category.document.map(file =>
				<li key={file.id}>
					{props.user && props.user.isAdmin
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