import { UserModel } from "@/models/user";
import { InitStateAuthType } from "../features/auth/authSlice";
import { RootState } from "./reducer";

export const authSelector  = (state:RootState): InitStateAuthType => state.auth;
export const currentUserSelector  = (state:RootState): UserModel | null => state.auth.user;
export const accessTokenSelector = (state:RootState): string => state.auth.accessToken;