import { configureStore } from '@reduxjs/toolkit'
import { storeSlice } from './features/mainstore/storeSlice'
export const store = configureStore({
  reducer: {
    mainStore : storeSlice.reducer
  },
})