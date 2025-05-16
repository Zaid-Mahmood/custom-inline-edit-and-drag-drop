import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { storeSlice } from './features/mainstore/storeSlice';
import { authSlice } from './features/mainstore/authSlice';
import { persistStore, persistReducer , FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {encryptTransform} from 'redux-persist-transform-encrypt';
const persistConfig = {
  key : "root" ,
  storage ,
  transforms: [
      encryptTransform({
        secretKey: import.meta.env.VITE_Encryption_Secret_Key,
        onError: function (error) {
         console.log("encrytion error" , error)
        },
      }),
    ],
}
const rootReducer  = combineReducers({
  mainStore : storeSlice.reducer , 
  auth : authSlice.reducer
})
 const persistedReducer = persistReducer(persistConfig , rootReducer);

export const store = configureStore({
  reducer: persistedReducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),
})
export const persistor = persistStore(store)
