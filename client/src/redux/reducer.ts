import { Reducer } from "@reduxjs/toolkit"
import authSlice, { InitStateAuthType } from "../features/auth/authSlice"
import postSlice, { InitStatePostType } from "@/features/post/postSlice"
export interface RootReducerType {
    auth : Reducer<InitStateAuthType>,
    post : Reducer<InitStatePostType>,
}
export interface RootState {
    auth : InitStateAuthType,
    post : InitStatePostType
}
const rootReducer : RootReducerType = {
    auth : authSlice,
    post : postSlice
}
export default rootReducer