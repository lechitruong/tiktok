import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import UserService, { GetUserParams } from "./userService"
import { UserModel } from "@/models/user"

export const getUser = createAsyncThunk(
    'auth/register',
    async ( userId : GetUserParams,thunkAPI) => {
        try {
            const resp = await UserService.getUser(userId)
            return resp
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export interface UsersPayload {
    err : number;
    mes : string;
    users : UserModel[]
}
export interface InitStateUserType {
    users : UserModel[] ;
    isError : boolean;
    isLoading : boolean;
    isSuccess : boolean;
    message : string;
}
const initialState : InitStateUserType = {
    users :[],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ''
}
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        
    },
    extraReducers : (builder) => {
        
    }
})