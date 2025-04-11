import { createContext, useState, useContext, ReactNode } from 'react';

// Definir el tipo de datos que se compartirán en el contexto
interface ModalContextType {
    hasBeenChanged: boolean;
    setHasBeenChanged: (value: boolean) => void;
}

// Crear el contexto
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Crear un proveedor para envolver la aplicación o los componentes que lo necesiten
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [hasBeenChanged, setHasBeenChanged] = useState(false);

    return (
        <ModalContext.Provider value={{ hasBeenChanged, setHasBeenChanged }}>
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook para acceder al contexto fácilmente
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
