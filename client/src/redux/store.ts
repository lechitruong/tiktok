import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import rootReducer from './reducer'
export const store = configureStore({
    reducer : rootReducer
})
export type AppDispatch = typeof store.dispatch