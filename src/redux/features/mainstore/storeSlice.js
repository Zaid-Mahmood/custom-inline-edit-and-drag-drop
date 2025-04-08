import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSideBar: false,
    dragId : null,
    layoutId : null,
    editMode : false, 
}

export const storeSlice = createSlice({
    name: 'mainStore',
    initialState,
    reducers: {
        setShowSideBar: (state) => {
            state.showSideBar = !state.showSideBar
        },
        setDraggedId : (state , action)=> {
            state.dragId = action.payload
        } ,
        setLayoutId: (state , action) =>{
            state.layoutId = action.payload
            localStorage.setItem("layoutId" ,  state.layoutId)
        } ,
        setEditMode : (state)=>{
            state.editMode = !state.editMode
        }
      
    },
})

export const { setShowSideBar, setDraggedId , setLayoutId , setEditMode } = storeSlice.actions
export default storeSlice.reducer