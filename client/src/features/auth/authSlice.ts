import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService, { LoginParams, RegisterParams, VertifyParams } from "./authService";
import { UserModel } from "@/models/user";
import { Bounce, toast } from "react-toastify";
export const register = createAsyncThunk(
    'auth/register',
    async ( user : RegisterParams,thunkAPI) => {
        try {
            const resp = await AuthService.register(user)
            return resp
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
export const login = createAsyncThunk(
    'auth/login',
    async (user : LoginParams,thunkAPI) => {
        try {
            const resp = await AuthService.login(user)
            return resp
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)
export const verifyAccount = createAsyncThunk(
    'auth/vertify',
    async (verifyInfo : VertifyParams,thunkAPI) => {
        try {
            return await AuthService.verifyAccount(verifyInfo)
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)
export interface AuthPayload {
    err : number;
    mes : string;
    accessToken : string;
    user : UserModel 
}
export interface InitStateAuthType {
    user : UserModel | null;
    isError : boolean;
    isLoading : boolean;
    isSuccess : boolean;
    message : string
    accessToken : string
}
const initialState : InitStateAuthType = {
    user :null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : '',
    accessToken : ''
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        updateAccessToken : (state,action) => {
            state.accessToken = action.payload.accessToken
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(register.pending,(state:InitStateAuthType)=> {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state :InitStateAuthType,action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected,(state:InitStateAuthType,action)=> {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message ? action.error.message : '';
            })

            .addCase(login.pending,(state:InitStateAuthType)=> {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state :InitStateAuthType,action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                const payload = action.payload as AuthPayload;
                state.user = payload.user;
                state.accessToken = payload.accessToken;
                toast.success('Login successful', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition : Bounce
                    });
                
            })
            .addCase(login.rejected,(state:InitStateAuthType,action)=> {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                const payload = action.payload as AuthPayload;
                state.message =  payload.mes;
                state.user = null;
                toast.error(payload.mes, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition : Bounce
                });
            })

            .addCase(verifyAccount.pending,(state:InitStateAuthType)=> {
                state.isLoading = true;
            })
            .addCase(verifyAccount.fulfilled, (state :InitStateAuthType,action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(verifyAccount.rejected,(state:InitStateAuthType,action)=> {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message ? action.error.message : '';
            })
    },
})
export const {
    updateAccessToken
} = authSlice.actions
export default authSlice.reducer;