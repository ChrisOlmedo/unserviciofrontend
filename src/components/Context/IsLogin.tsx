import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface IsLoginContextProps {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

const IsLoginContext = createContext<IsLoginContextProps | undefined>(undefined);


export const IsLoginProvider = ({ children }: { children: ReactNode }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    // Verificar si hay un estado previo de login en localStorage
    useEffect(() => {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        if (storedLoginState === 'true') {
            setIsLogin(true);
        }
    }, []);

    return (
        <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </IsLoginContext.Provider>
    );
};

export const useIsLogin = (): IsLoginContextProps => {
    const context = useContext(IsLoginContext);
    if (context === undefined) {
        throw new Error('useIsLogin must be used within an IsLoginProvider');
    }
    return context;
};