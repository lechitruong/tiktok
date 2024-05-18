import { InitStateAuthType } from "../features/auth/authSlice";
import { RootState } from "./reducer";

export const authSelector  = (state:RootState): InitStateAuthType => state.auth;