import { ServiceProviderPageConfig } from '../../../types/types';
import { createContext, useContext, useReducer } from 'react';
import { Image } from '../../../types/types';

export const initialStateServiceProviderPage: ServiceProviderPageConfig = {
    // Slugable
    slug: "",

    // ProviderBasicInfo
    enterpriseName: "",
    logo: { url: "", file: null },
    typeService: "",
    rating: 0,

    // ProviderContactInfo
    phone: "",
    whatsapp: "",
    email: "",

    // ProviderServiceArea
    location: "",
    coverage: {
        maxDistance: 0,
        cities: [],
    },

    // ProviderPageContent
    services: [],
    aboutMe: "",
    gallery: [],
    hasChangesForm: false,    // Controla cambios no guardados en UI
    hasModifiedObject: false // Indica si hay cambios para el backend
};
// Acciones iniciales
type ServiceProviderAction =
    | { type: 'UPDATE_NAME'; enterpriseName: string }
    | { type: 'UPDATE_LOGO'; logo: Image };




const serviceProviderReducer = (state: ServiceProviderPageConfig, action: ServiceProviderAction): ServiceProviderPageConfig => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, enterpriseName: action.enterpriseName };
        case 'UPDATE_LOGO':
            return { ...state, logo: action.logo };
        /*
        case 'SET_INITIAL_DATA':
            return {
                ...action.payload,
                hasChangesForm: false,
                hasModifiedObject: false
            };
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value,
                hasChangesForm: true,
                hasModifiedObject: true
            };
        case 'MARK_AS_SAVED':
            return {
                ...state,
                hasChangesForm: false,
                hasModifiedObject: false
            };
            */
        default:
            return state;
    }
}
export const ServiceProviderConfigContext = createContext<{ serviceProviderState: ServiceProviderPageConfig; ProviderStateDispatch: React.Dispatch<ServiceProviderAction>; }>({ serviceProviderState: initialStateServiceProviderPage, ProviderStateDispatch: () => null });

export const ServiceProviderConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const [serviceProviderState, ProviderStateDispatch] = useReducer(serviceProviderReducer, initialStateServiceProviderPage);

    return (
        <ServiceProviderConfigContext.Provider value={{ serviceProviderState, ProviderStateDispatch }}>
            {children}
        </ServiceProviderConfigContext.Provider>
    );
}

//hook para usar el contexto
export const useServiceProvider = () => useContext(ServiceProviderConfigContext);