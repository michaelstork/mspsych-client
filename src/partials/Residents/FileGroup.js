import React from 'react';

const FileGroup = (props) => (
	<div className="file-group panel-item">
		{props.user && props.user.isAdmin
			&& <i onClick={() => props.delete(props.category.id)} className="material-icons">clear</i>}
		<h4>{props.category.title}</h4>
		<ul>
			{props.category.document.map(file =>
				<li key={file.id}>
					<a target="_blank" href={'/api/storage/documents/' + file.filename}>
						{file.title}
					</a>
				</li>
			)}
		</ul>
	</div>
)

export default FileGroup;