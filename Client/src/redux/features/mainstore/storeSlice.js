import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSideBar: false,
    dragId: null,
    layoutId: null,
    editMode: false,
    showSuccessAlert: false,
    msgTyp: "",
    loginCredentials: {}
}

export const storeSlice = createSlice({
    name: 'mainStore',
    initialState,
    reducers: {
        setShowSideBar: (state) => {
            state.showSideBar = !state.showSideBar
        },
        setDraggedId: (state, action) => {
            state.dragId = action.payload
        },
        setLayoutId: (state, action) => {
            state.layoutId = action.payload
            localStorage.setItem("layoutId", state.layoutId)
        },
        setEditMode: (state) => {
            state.editMode = !state.editMode
        },
        setSuccessMode: (state, action) => {
            state.showSuccessAlert = action.payload.show
            state.msgTyp = action.payload.type
        },
        setLoginCrederntials: (state, action) => {
            state.loginCredentials = action.payload
        }
    },
})

export const { setShowSideBar, setDraggedId, setLayoutId, setEditMode, setSuccessMode, setLoginCrederntials, loginCredentials, showSuccessAlert, msgTyp , dragId } = storeSlice.actions
export default storeSlice.reducer