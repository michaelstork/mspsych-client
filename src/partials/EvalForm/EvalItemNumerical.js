import React from 'react';

const EvalItemNumerical = (props) => (
	<div className="eval-item-options">
		{props.item.options.filter(option => option.value !== null).map(option =>
			<div key={option.id}
				onClick={() => props.handleItemChange(props.item.id, option.value)}
				dangerouslySetInnerHTML={{__html: option.content}}
				className={
					(props.formValue === option.value ? 'selected ' : '') + 'eval-item-option'
				} />
		)}
	</div>
)

export default EvalItemNumerical;