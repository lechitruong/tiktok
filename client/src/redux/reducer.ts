import { Reducer } from "@reduxjs/toolkit"
import authSlice, { InitStateAuthType } from "../features/auth/authSlice"
export interface RootReducerType {
    auth : Reducer<InitStateAuthType>
}
export interface RootState {
    auth : InitStateAuthType
}
const rootReducer : RootReducerType = {
    auth : authSlice
}
export default rootReducer