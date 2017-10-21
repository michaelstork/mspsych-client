import React from 'react';

const EvalItemTitle = (props) => (
	<p className="eval-item-title">
		{props.item.content}
		{props.item.options.filter(option => option.value === null).map(option =>
			<label className="input-container" key={option.id}>
				<input type="radio"
					onChange={
						() => props.handleItemChange(
							props.item.id, option.value
						)
					}
					checked={props.formValue === option.value} />
				<span>{option.content}</span>
			</label>
		)}
	</p>
)

export default EvalItemTitle;