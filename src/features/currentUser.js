import { createSlice } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: {
		user: {},
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = {};
		},
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const { setUser, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;