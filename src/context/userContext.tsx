import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';
import { UserState, UserAction, userData } from '../types/types';
import { getData } from '../services/userServices';

const initialUserState: UserState = {
    isLoading: true,
    user: null
};
const userReducer = (state: UserState, payload: UserAction): UserState => {
    switch (payload.type) {
        case "SET_USER":
            return { ...state, user: payload.data.user, isLoading: false };
        case "LOGOUT":
            return { ...initialUserState, isLoading: false };
        case "SET_LOADING":
            return { ...state, isLoading: payload.isLoading }
        default:
            return state;
    }
}

const UserContext = createContext<{ userState: UserState; userDispatch: React.Dispatch<UserAction>; } | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);

    // Obtiene el id si tiene sesión iniciada
    useEffect(() => {
        userDispatch({ type: "SET_LOADING", isLoading: true });
        const fetchUser = async () => {
            try {

                const getUser = await getData();
                if (!getUser) {
                    return;
                }
                userDispatch({ type: "SET_USER", data: getUser });
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                userDispatch({ type: "SET_LOADING", isLoading: false });
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

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useIsLogin must be used within an IsLoginProvider');
    }
    const { userState, userDispatch } = context;
    const setUser = (data: userData) => userDispatch({ type: "SET_USER", data });
    const logoutUser = () => userDispatch({ type: "LOGOUT" });

    return { userState, setUser, logoutUser };
};