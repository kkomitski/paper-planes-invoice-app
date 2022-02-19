import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setItem, clearItems } from '../features/item';

export default function EditItems({ id, name, price, quantity, total, editDisable, invoiceID }) {
	const [totalState, setTotalState] = useState(`£${total}`);
	const [itemsForm, setItemsForm] = useState({
		invoiceID: invoiceID,
		id: id,
		price: price,
		quantity: quantity,
		name: name,
		total: `£${total}`,
	});

	const editName = useRef();
	const editPrice = useRef();
	const editQuantity = useRef();
	const editTotal = useRef();

	const dispatch = useDispatch();

	const thisTotal = () => {
		if (editPrice && editQuantity) {
			if (
				isNaN(editPrice.current.value.replace(/\D/g, '') * parseInt(editQuantity.current.value))
			) {
				setTotalState('0.00');
			} else {
				const currentEditPrice = editPrice.current.value
					.match(/[+-]?\d+(\.\d+)?/g)
					.map(function (v) {
						return parseFloat(v);
					});
				const currentEditQuantity = editQuantity.current.value
					.match(/[+-]?\d+(\.\d+)?/g)
					.map(function (v) {
						return parseFloat(v);
					});
				setTotalState(`£${(currentEditPrice * currentEditQuantity).toFixed(2)}`);
			}
		}
		editTotal.current.value = totalState;
	};

	const addInfoToItemsForm = (e) => {
		thisTotal();
		setItemsForm({ ...itemsForm, total: totalState });
		setItemsForm({
			...itemsForm,
			[e.target.name]: e.target.value,
		});
	};
	// const foo = [`${id}`];

	const dispatchInfo = (item) => {
		thisTotal();
		dispatch(setItem({ item }));
	};

	const defaultPrice = `£${price.match(/[+-]?\d+(\.\d+)?/g).map(function (v) {
		return parseFloat(v).toFixed(2);
	})}`;

	// const defaultTotal = `£${totalState.match(/[+-]?\d+(\.\d+)?/g).map(function (v) {
	// 	return parseFloat(v);
	// })}`;

	useEffect(() => dispatchInfo({ ...itemsForm }), [itemsForm]);

	return (
		<div className='full-info-single-item'>
			<textarea
				onChange={(e) => addInfoToItemsForm(e)}
				rows={1}
				type='text'
				className='full-info-item edit-name'
				name='name'
				ref={editName}
				disabled={editDisable}
				defaultValue={name}
			/>
			<textarea
				rows={1}
				type='number'
				className='full-info-item edit-quantity'
				name='quantity'
				ref={editQuantity}
				onChange={(e) => addInfoToItemsForm(e)}
				disabled={editDisable}
				defaultValue={quantity}
			/>
			<textarea
				rows={1}
				type='text'
				className='full-info-item edit-price'
				name='price'
				ref={editPrice}
				onChange={(e) => addInfoToItemsForm(e)}
				disabled={editDisable}
				defaultValue={defaultPrice}
			/>
			{/* <h4 ref={editTotal} className='full-info-item edit-total'>
				£{`${totalState}`}
			</h4> */}
			<textarea
				rows={1}
				type='text'
				className='full-info-item edit-price'
				name='total'
				ref={editTotal}
				onChange={(e) => addInfoToItemsForm(e)}
				disabled={true}
				defaultValue={totalState}
			/>
		</div>
	);
}
