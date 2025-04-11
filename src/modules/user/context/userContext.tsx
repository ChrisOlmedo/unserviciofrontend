import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';
import { UserState, userData } from '../../../types/types';
import { getData } from '../api/userServices';

type UserAction =
    | { type: "SET_USER", payload: userData }
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

    // Obtiene el id si tiene sesión iniciada
    useEffect(() => {
        userDispatch({ type: "SET_LOADING", payload: true });
        const fetchUser = async () => {
            try {

                const getUser = await getData();
                if (!getUser) {
                    return;
                }
                userDispatch({ type: "SET_USER", payload: getUser });
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

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useIsLogin must be used within an IsLoginProvider');
    }
    const { userState, userDispatch } = context;
    const setUser = (data: userData) => userDispatch({ type: "SET_USER", payload: data });
    const logoutUser = () => userDispatch({ type: "LOGOUT" });

    return { userState, setUser, logoutUser };
};