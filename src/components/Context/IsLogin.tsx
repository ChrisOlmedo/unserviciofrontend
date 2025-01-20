import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

//import axiosClient from "./axiosClient";

type Action =
    | { type: "Login", idClient: string }
    | { type: "Set_User_Data", data: userData }
    | { type: "Logout" }

interface userData {
    name: string;
    email: string;
    role: "normal" | "serviceprovider";
}

type userInfo = {
    idClient: string,
    userData: userData | null
};

const initialLoginState: userInfo = {
    idClient: "",
    userData: null
};

const IsLoginContext = createContext<{ state: userInfo; dispatch: React.Dispatch<Action>; } | null>(null);


const loginReducer = (state: userInfo, payload: Action): userInfo => {
    switch (payload.type) {
        case "Login":
            localStorage.setItem('userId', payload.idClient)
            return { ...state, idClient: payload.idClient }
        case "Set_User_Data":
            return { ...state, userData: payload.data }
        case "Logout":
            localStorage.removeItem('userId')
            return { ...initialLoginState }
        default:
            return state;
    }
}


export const IsLoginProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(loginReducer, initialLoginState);

    // Obtiene el id si tiene sesión iniciada
    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (storedId) {
            dispatch({ type: "Login", idClient: storedId });

        }
    }, [state.idClient]);

    // Obtener datos del usuario cuando cambia el ID 
    useEffect(() => {
        if (!state.idClient) return;
        const getData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/user/getData/${state.idClient}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: userData = await response.json();
                dispatch({ type: "Set_User_Data", data: data });
            } catch (err) {
                console.error("Error al obtener datos del usuario:", err);
                dispatch({ type: "Logout" });
            }
        }
        getData();
    }, [state.idClient]);


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

    const login = (idClient: userInfo["idClient"]) => dispatch({ type: "Login", idClient: idClient });
    const logout = () => dispatch({ type: "Logout" });

    return { state, login, logout };
};