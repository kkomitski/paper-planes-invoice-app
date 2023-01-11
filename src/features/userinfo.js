import { createSlice } from '@reduxjs/toolkit';

export const userinfoSlice = createSlice({
	name: 'userinfo',
	initialState: {
		info: {},
	},
	reducers: {
		setInfo: (state, action) => {
			state.info = action.payload;
		},
		clearInfo: (state) => {
			state.info = {};
		},
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const { setInfo, clearInfo } = userinfoSlice.actions;

export default userinfoSlice.reducer;
