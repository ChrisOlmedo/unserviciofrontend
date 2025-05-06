import { ServiceProviderPageConfig } from '../../../../types/types';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { serviceProviderReducer, initialStateServiceProviderPage, ServiceProviderAction } from '../reducers/serviceProviderReducer';
import { useUser } from '../../../user/context/userContext';

export const ServiceProviderConfigContext =
    createContext<{ serviceProviderState: ServiceProviderPageConfig; ServiceProviderDispatch: React.Dispatch<ServiceProviderAction>; }>
        ({ serviceProviderState: initialStateServiceProviderPage, ServiceProviderDispatch: () => null });

export const ServiceProviderConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [serviceProviderState, ServiceProviderDispatch] = useReducer(serviceProviderReducer, initialStateServiceProviderPage);

    const { userState } = useUser(); // Asumiendo que tienes un hook de autenticación

    useEffect(() => {
        if (userState.user?.role === 'service-provider') {
            // Solo hacer fetch si es provider
            /*
            fetchServiceProviderData(userState.user.slug)
              .then(data => dispatch({ type: 'SET_DATA', payload: data }))
              .catch(error => dispatch({ type: 'SET_ERROR', payload: error }));
              */
        }
    }, [userState.user?.role, userState.user?.slug]);


    return (
        <ServiceProviderConfigContext.Provider value={{ serviceProviderState, ServiceProviderDispatch }}>
            {children}
        </ServiceProviderConfigContext.Provider>
    );
}

//hook para usar el contexto
export const useServiceProviderContext = () => {
    const context = useContext(ServiceProviderConfigContext);
    if (!context) throw new Error("useServiceProviderContext debe usarse dentro del ServiceProviderProvider");
    return context;
};