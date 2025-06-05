import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';
import { UserState, UserData } from "types";
import { getUser } from '../services/userServices';

/**
 * Contexto global de usuario (autenticación y sesión)
 * Usa los servicios y hooks de user para obtener y actualizar el usuario
 * Las vistas (pages) de account deben consumir este contexto
 */

type UserAction =
    | { type: "SET_USER", payload: UserData }
    | { type: "LOGOUT" }
    | { type: "SET_LOADING", payload: boolean };

const initialUserState: UserState = {
    isLoading: true,
    user: null
};
const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload.user, isLoading: false };
        case "LOGOUT":
            return { ...initialUserState, isLoading: false };
        case "SET_LOADING":
            return { ...state, isLoading: action.payload }
        default:
            return state;
    }
}

const UserContext = createContext<{ userState: UserState; userDispatch: React.Dispatch<UserAction>; }>({ userState: initialUserState, userDispatch: () => null });

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const userData = await getUser();
                if (!userData) {
                    return;
                }
                userDispatch({ type: "SET_USER", payload: userData });
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                userDispatch({ type: "SET_LOADING", payload: false });
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;

// Hook para refrescar el usuario y hacer dispatch automáticamente
export const useFetchUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useFetchUser debe usarse dentro de un UserProvider');
    }
    const { userDispatch } = context;
    return async () => {
        userDispatch({ type: "SET_LOADING", payload: true });
        try {
            const userData = await getUser();
            if (!userData) {
                return;
            }
            userDispatch({ type: "SET_USER", payload: userData });
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            userDispatch({ type: "SET_LOADING", payload: false });
        }
    };
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe usarse dentro de un UserProvider');
    }
    const { userState, userDispatch } = context;
    const setUser = (data: UserData) => userDispatch({ type: "SET_USER", payload: data });
    const logoutUser = () => userDispatch({ type: "LOGOUT" });
    const fetchUser = useFetchUser();

    return { userState, setUser, logoutUser, fetchUser };
};