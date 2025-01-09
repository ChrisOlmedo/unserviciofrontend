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

// Verificar si hay un estado previo de login en localStorage
/*useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
        dispatch("Login");
    }
}, []);*/

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
    return context;
};