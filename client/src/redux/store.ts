import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import rootReducer from './reducer'
import { setPostUpload } from '@/features/post/postSlice'
export const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // ignoredActions: ["auth/setPostUpload"],
            // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
            // ignoredPaths: ['items.dates'],
          },
        }),
})
export type AppDispatch = typeof store.dispatch