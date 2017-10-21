import React from 'react';
import EvalItemTitle from './EvalItemTitle';
import EvalItemTextarea from './EvalItemTextarea';
import EvalItemNumerical from './EvalItemNumerical';

const EvalFormCategory = (props) => (
	<div className="panel-item item-category">
		<header>
			<h5>{props.category.title}</h5>
		</header>
		{props.category.items.map(item => 
			<div className="eval-item" key={item.id}>
				<EvalItemTitle
					item={item}
					formValue={props.items[item.id]}
					handleItemChange={props.handleItemChange} />
				{item.description &&
					<div className="eval-item-description"
						dangerouslySetInnerHTML={{__html: item.description}} />
				}
				{item.type === 'numerical' &&
					<EvalItemNumerical
						item={item}
						formValue={props.items[item.id]}
						handleItemChange={props.handleItemChange} />
				}
				{item.type === 'textarea' &&
					<EvalItemTextarea
						item={item}
						handleItemChange={props.handleItemChange} />
				}
			</div>
		)}
	</div>
)

export default EvalFormCategory;