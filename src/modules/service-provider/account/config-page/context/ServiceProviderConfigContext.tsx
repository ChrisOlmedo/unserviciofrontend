import { ServiceProviderPageConfig, ServiceProviderData } from "types";
import { createContext, useContext, useEffect, useReducer } from 'react';
import { serviceProviderReducer, initialStateServiceProviderPage, ServiceProviderAction } from '../reducers/serviceProviderReducer';
import { useUser } from 'modules/user/context/userContext';
import { getCompletionStatusFromData } from '../utils/validation';
import { getServiceProviderProfile } from "modules/service-provider/services/serviceProviderApi";

export const ServiceProviderConfigContext =
    createContext<{ serviceProviderState: ServiceProviderPageConfig; ServiceProviderDispatch: React.Dispatch<ServiceProviderAction>; }>
        ({ serviceProviderState: initialStateServiceProviderPage, ServiceProviderDispatch: () => null });

export const ServiceProviderConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [serviceProviderState, ServiceProviderDispatch] = useReducer(serviceProviderReducer, initialStateServiceProviderPage);

    const { userState } = useUser(); // Asumiendo que tienes un hook de autenticación

    useEffect(() => {
        if (userState.user?.role === 'service-provider') {
            getServiceProviderProfile().then(data => {
                ServiceProviderDispatch({ type: 'SET_NEW_DATA', data: data })
                console.log("datos del service provider", data);
            })
        }
    }, [userState.user?.role, userState.user?.slug]);

    useEffect(() => {
        const newCompletionStatus = getCompletionStatusFromData(serviceProviderState);
        if (JSON.stringify(newCompletionStatus) !== JSON.stringify(serviceProviderState.completionStatus)) {
            ServiceProviderDispatch({ type: 'SET_COMPLETION_STATUS', completionStatus: newCompletionStatus });
        }
    }, [
        serviceProviderState.logo,
        serviceProviderState.aboutMe,
        serviceProviderState.services,
        serviceProviderState.gallery,
        serviceProviderState.enterpriseName,
        serviceProviderState.phone,
        serviceProviderState.email,
        serviceProviderState.location,
    ]);

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