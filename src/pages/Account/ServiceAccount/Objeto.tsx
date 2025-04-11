import { ServicePage, ProviderContactInfo, ProviderServiceArea } from '../../../types/types';

type ImageInput = {
    url: string;
    file?: File; // Para manejar imágenes nuevas no subidas
    isNew?: boolean;
    toDelete?: boolean;
};

type ServiceProviderAction =
    // Acciones básicas
    | { type: 'SET_INITIAL_DATA'; payload: ServicePage }
    | { type: 'RESET_CHANGES' }
    | { type: 'MARK_AS_SAVED' }

    // Acciones para campos simples
    | { type: 'UPDATE_FIELD'; field: keyof Omit<ServicePage, 'providerPageContent' | 'logo'>; value: any }

    // Acciones para contacto
    | { type: 'UPDATE_CONTACT_FIELD'; field: keyof ProviderContactInfo; value: any }

    // Acciones para imágenes
    | { type: 'UPDATE_LOGO'; value: ImageInput }
    | { type: 'ADD_GALLERY_IMAGE'; value: ImageInput }
    | { type: 'REMOVE_GALLERY_IMAGE'; index: number }
    | { type: 'UPDATE_GALLERY_IMAGE'; index: number; value: Partial<ImageInput> }

    // Acciones para el área de servicio
    | { type: 'UPDATE_SERVICE_AREA'; value: Partial<ProviderServiceArea> }
    | { type: 'UPDATE_COVERAGE_CITIES'; cities: string[] }

    // Acciones para el contenido de la página
    | { type: 'UPDATE_ABOUT_ME'; value: string }
    | { type: 'UPDATE_SERVICES'; services: string[] }
    | { type: 'ADD_SERVICE'; service: string }
    | { type: 'REMOVE_SERVICE'; index: number };

interface EditableServiceProviderState extends ServicePage {
    originalData: ServicePage;
    hasChanges: boolean;
    logo: ImageInput;
    providerPageContent: {
        services: string[];
        aboutMe: string;
        gallery: ImageInput[];
    };
}

const serviceProviderReducer = (state: EditableServiceProviderState, action: ServiceProviderAction): EditableServiceProviderState => {
    switch (action.type) {
        case 'SET_INITIAL_DATA':
            return {
                ...action.payload,
                originalData: action.payload,
                hasChanges: false,
                logo: action.payload.logo,
                providerPageContent: {
                    ...action.payload.providerPageContent,
                    gallery: action.payload.providerPageContent.gallery.map(img => ({ url: img.url }))
                }
            };

        case 'RESET_CHANGES':
            return {
                ...state.originalData,
                originalData: state.originalData,
                hasChanges: false,
                logo: state.originalData.logo,
                providerPageContent: {
                    ...state.originalData.providerPageContent,
                    gallery: state.originalData.providerPageContent.gallery.map(img => ({ url: img.url }))
                }
            };

        case 'MARK_AS_SAVED':
            return {
                ...state,
                originalData: state,
                hasChanges: false,
                // Limpiar flags temporales de imágenes
                logo: { url: state.logo.url },
                providerPageContent: {
                    ...state.providerPageContent,
                    gallery: state.providerPageContent.gallery.map(img => ({ url: img.url }))
                }
            };

        case 'UPDATE_LOGO':
            return {
                ...state,
                logo: action.value,
                hasChanges: true
            };

        case 'ADD_GALLERY_IMAGE':
            return {
                ...state,
                providerPageContent: {
                    ...state.providerPageContent,
                    gallery: [...state.providerPageContent.gallery, action.value]
                },
                hasChanges: true
            };

        case 'REMOVE_GALLERY_IMAGE':
            const updatedGallery = [...state.providerPageContent.gallery];
            updatedGallery.splice(action.index, 1);
            return {
                ...state,
                providerPageContent: {
                    ...state.providerPageContent,
                    gallery: updatedGallery
                },
                hasChanges: true
            };

        case 'UPDATE_GALLERY_IMAGE':
            const newGallery = [...state.providerPageContent.gallery];
            newGallery[action.index] = { ...newGallery[action.index], ...action.value };
            return {
                ...state,
                providerPageContent: {
                    ...state.providerPageContent,
                    gallery: newGallery
                },
                hasChanges: true
            };

        // Resto de casos...

        default:
            return state;
    }
};