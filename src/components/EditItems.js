import React, { useRef, useState } from 'react';

export default function EditItems({ id, name, price, quantity, total, editDisable }) {
	const [totalState, setTotalState] = useState(total);

	const editName = useRef();
	const editPrice = useRef();
	const editQuantity = useRef();

	const thisTotal = () => {
		if (editPrice && editQuantity) {
			setTotalState(parseInt(editPrice.current.value) * parseInt(editQuantity.current.value));
		}
	};

	return (
		<div className='full-info-single-item'>
			<input
				type='text'
				className='full-info-item edit-name'
				name='name'
				ref={editName}
				disabled={editDisable}
				defaultValue={name}
			/>
			<input
				type='number'
				className='full-info-item edit-quantity'
				name='quantity'
				ref={editQuantity}
				onChange={() => thisTotal()}
				disabled={editDisable}
				defaultValue={quantity}
			/>
			<input
				type='number'
				className='full-info-item edit-price'
				name='price'
				ref={editPrice}
				onChange={() => thisTotal()}
				disabled={editDisable}
				defaultValue={price}
			/>
			<h4>£{`${totalState}`}</h4>
		</div>
	);
}
