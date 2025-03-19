import { createContext, useContext } from "react";

interface ConfigContextType {
    isConfig: boolean;
    handleModalEdith: (context: string) => void;
}

export const ConfigContext = createContext<ConfigContextType | null>(null);

// Hook para usar el contexto en los subcomponentes
export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfig debe ser usado dentro de un ConfigContext.Provider");
    }
    return context;
};
