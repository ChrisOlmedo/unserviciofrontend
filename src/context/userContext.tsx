import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';
import { userData, Action } from '../types/types';
import { getData } from '../services/userServices';


const initialUserState: userData = {
    id: "",
    user: null,
};
const userReducer = (state: userData, payload: Action): userData => {
    switch (payload.type) {
        case "Login":
            localStorage.setItem('userId', payload.data.id)
            return { ...state, user: payload.data.user, id: payload.data.id }
        case "Set_User_Data":
            return { ...state, user: payload.data.user, id: payload.data.id }
        case "Logout":
            localStorage.removeItem('userId')
            return { ...initialUserState }
        default:
            return state;
    }
}
//import axiosClient from "./axiosClient";

const UserContext = createContext<{ state: userData; dispatch: React.Dispatch<Action>; } | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);

    // Obtiene el id si tiene sesión iniciada
    useEffect(() => {
        getData(dispatch);
    }, []);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useIsLogin = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useIsLogin must be used within an IsLoginProvider');
    }
    const { state, dispatch } = context;

    const login = (userData: userData) => dispatch({ type: "Login", data: userData });
    const logout = () => dispatch({ type: "Logout" });

    return { state, login, logout };
};