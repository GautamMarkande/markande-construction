import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/Userslice'
import {persistReducer,persistStore} from 'redux-persist'; 
import storage from "redux-persist/lib/storage";
const RootReducer = combineReducers({
    user:userReducer
})
const persistConfig= {
    key:'root',
    version:1,
    storage
}
const persistedReducer = persistReducer(persistConfig,RootReducer)
export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false
        })
})
export const  persistor = persistStore(store);