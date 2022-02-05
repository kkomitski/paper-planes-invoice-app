import React from 'react';
import trash from '../assets/trash-solid.svg';

export default function ListItem() {
	return (
		<>
			<div className='item-attribute name'>
				<h2>Name</h2>
				<input required type='text' className='new-invoice-input' />
			</div>
			<div className='item-attribute qty'>
				<h2>Qty</h2>
				<input required type='text' className='new-invoice-input' />
			</div>
			<div className='item-attribute price'>
				<h2>Price</h2>
				<input required type='text' className='new-invoice-input' />
			</div>
			<div className='item-attribute total'>
				<h2>Total</h2>
				<div className='total-input'>
					<input type='text' disabled={true} className='new-invoice-input total-input-field' />
					<img className='trash' src={trash} alt='X' />
				</div>
			</div>
		</>
	);
}
