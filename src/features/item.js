import { createSlice } from '@reduxjs/toolkit';

export const itemSlice = createSlice({
	name: 'item',
	initialState: {
		invoices: {},
	},
	reducers: {
		setItem: (state, action) => {
			let invoices = state.invoices;

			const currentInvoice = `${action.payload.item.invoiceID}`;
			const eachItem = `${action.payload.item.id}`;

			invoices[currentInvoice] = {
				...invoices[currentInvoice],
				[eachItem]: {
					...action.payload.item,
					total:
						action.payload.item.price.match(/[+-]?\d+(\.\d+)?/g).map(function (v) {
							return parseFloat(v).toFixed(2);
						}) * action.payload.item.quantity,
				},
			};

			state.items = invoices;
		},
		clearItems: (state) => {
			console.log('click');
			state.invoices = {};
		},
	},
});

export const { setItem, clearItems } = itemSlice.actions;

export default itemSlice.reducer;
