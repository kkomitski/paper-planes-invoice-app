import React from 'react';
import trash from '../assets/trash-solid.svg';

export default function ListItem(props) {
	// console.log(props);
	const { removeItem, id } = props;
	// console.log(id);
	return (
		<div className='item'>
			<div className='item-attribute name'>
				<input required type='text' className='new-invoice-input' />
			</div>
			<div className='item-attribute qty'>
				<input required type='text' className='new-invoice-input' />
			</div>
			<div className='item-attribute price'>
				<input required type='text' className='new-invoice-input' />
			</div>
			<div className='item-attribute total'>
				<div className='total-input'>
					<input type='text' disabled={true} className='new-invoice-input total-input-field' />
					<img className='trash' onClick={() => removeItem(id)} src={trash} alt='X' />
				</div>
			</div>
		</div>
	);
}
