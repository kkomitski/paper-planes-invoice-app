import React, { useRef, useState } from 'react';
import trash from '../assets/trash-solid.svg';

export default function Item(props) {
	const { removeItem, id, name, price, quantity } = props;
	const [total, setTotal] = useState('');
	// console.log(props);
	// const [currentItemPrice, setCurrentItemPrice] = useState('');
	// const [currentItemQuantity, setCurrentItemQuantity] = useState('');

	const itemName = useRef();
	const itemQuantity = useRef();
	const itemPrice = useRef();

	const calcTotal = () => {
		if (itemPrice && itemQuantity) {
			if (itemPrice.current.value && itemQuantity.current.value) {
				const totali = itemPrice.current.value * itemQuantity.current.value;
				// setCurrentItemPrice(itemPrice.current.value);
				// setCurrentItemQuantity(itemQuantity.current.value);
				setTotal(totali);
			} else if (!itemPrice.current.value || !itemQuantity.current.value) {
				setTotal('');
			}
		}
	};

	return (
		<div className='item'>
			<div className='item-attribute name'>
				<input required ref={itemName} type='text' className='new-invoice-input' />
			</div>
			<div className='item-attribute qty'>
				<input
					required
					ref={itemQuantity}
					type='text'
					onChange={calcTotal}
					className='new-invoice-input'
				/>
			</div>
			<div className='item-attribute price'>
				<input
					required
					ref={itemPrice}
					type='text'
					onChange={calcTotal}
					className='new-invoice-input'
				/>
			</div>
			<div className='item-attribute total'>
				<div className='total-input'>
					<input
						type='text'
						disabled={true}
						value={total}
						className='new-invoice-input total-input-field'
					/>
					<img className='trash' onClick={() => removeItem(id)} src={trash} alt='X' />
				</div>
			</div>
		</div>
	);
}
