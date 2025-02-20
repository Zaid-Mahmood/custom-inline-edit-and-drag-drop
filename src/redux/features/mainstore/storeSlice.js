import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSideBar: false
}

export const storeSlice = createSlice({
    name: 'mainStore',
    initialState,
    reducers: {
        setShowSideBar: (state) => {
            state.showSideBar = !state.showSideBar
        }
    },
})

export const { setShowSideBar } = storeSlice.actions

export default storeSlice.reducer