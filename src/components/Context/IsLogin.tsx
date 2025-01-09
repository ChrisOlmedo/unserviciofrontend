import React, { createContext, useContext, ReactNode, useReducer } from 'react';

type Action =
    | { type: "Login" }
    | { type: "Logout" };

type Authstate = {
    isLogin: boolean,
};
const initialLoginState: Authstate = {
    isLogin: localStorage.getItem('isLoggedIn') === 'true',
};

const IsLoginContext = createContext<{ state: Authstate; dispatch: React.Dispatch<Action>; } | null>(null);


const loginReducer = (state: Authstate, action: Action): Authstate => {
    switch (action.type) {
        case "Login":
            localStorage.setItem('isLoggedIn', 'true');
            return {
                isLogin: true,
            };

        case "Logout":
            localStorage.setItem('isLoggedIn', 'false');
            return {
                isLogin: false,
            }
        default:
            return state;
    }
}


export const IsLoginProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(loginReducer, initialLoginState);

    return (
        <IsLoginContext.Provider value={{ state, dispatch }}>
            {children}
        </IsLoginContext.Provider>
    );
};

export const useIsLogin = () => {
    const context = useContext(IsLoginContext);
    if (!context) {
        throw new Error('useIsLogin must be used within an IsLoginProvider');
    }
    const { state, dispatch } = context;

    const login = () => dispatch({ type: "Login" });
    const logout = () => dispatch({ type: "Logout" });

    return { state, login, logout };
};