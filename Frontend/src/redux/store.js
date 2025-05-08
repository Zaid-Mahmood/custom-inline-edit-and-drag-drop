import { configureStore } from '@reduxjs/toolkit'
import { storeSlice } from './features/mainStore/storeSlice';
import { authSlice } from './features/mainstore/authSlice';
export const store = configureStore({
  reducer: {
    mainStore : storeSlice.reducer ,
    auth : authSlice.reducer
  },
})