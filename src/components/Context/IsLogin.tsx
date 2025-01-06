import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IsLoginContextProps {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

const IsLoginContext = createContext<IsLoginContextProps | undefined>(undefined);

export const IsLoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

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