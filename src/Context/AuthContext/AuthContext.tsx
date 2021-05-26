import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from "react";
import firebase, { auth } from "../../Firebase/Firebase";
import { createUserEntity } from "../../Firebase/User";
import { authReducer } from "../../Reducer/AuthReducer/AuthReducer";
import { AuthContextValue, AuthInitialStateType } from "./AuthContext.types";

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth()
        .signInWithPopup(provider)
        .catch((err) => {
            console.log("signIn error", err.message, err);
        });
};

const signOut = () => {
    if (auth().currentUser) {
        auth()
            .signOut()
            .catch((err) => {
                console.log("signOut error", err.message, err);
            });
    }
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const initialState: AuthInitialStateType = { isLoggedIn: false };
    const [authState, authDispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        const observer = auth().onAuthStateChanged(function (user) {
            if (user) {
                authDispatch({
                    type: "LOGIN",
                    payload: true,
                });
                createUserEntity(user);
            }
        });
        return () => {
            observer();
        };
    }, []);
    return (
        <AuthContext.Provider
            value={{
                authState,
                authDispatch,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuthContext() {
    return useContext(AuthContext) as AuthContextValue;
}
