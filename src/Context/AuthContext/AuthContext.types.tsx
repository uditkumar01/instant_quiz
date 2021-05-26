import { Dispatch } from "react";
import { AuthActionType } from "../../Reducer/AuthReducer/AuthReducer.types";

export interface AuthInitialStateType {
    isLoggedIn: boolean;
}
export interface AuthContextValue {
    authState: AuthInitialStateType;
    authDispatch: Dispatch<AuthActionType>;
    signIn: () => void;
    signOut: () => void;
}
