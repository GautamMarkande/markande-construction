import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import { myApis } from './services/api'

export const store = configureStore({
    reducer:{

        [myApis.reducerPath]:myApis.reducer
    },
    middleware:(getDefaultMiddleware)=>(
     getDefaultMiddleware().concat(myApis.middleware)
    )
})
setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself.