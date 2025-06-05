import { ServiceProviderPageConfig, Image, CompletionStatus, InformationFormData, ServiceProviderData } from "types";

export const initialStateServiceProviderPage: ServiceProviderPageConfig = {
    slug: "",
    enterpriseName: "",
    logo: { id: '', url: "", file: null },
    serviceCategories: [],
    rating: 0,
    phone: "",
    whatsapp: "",
    email: "",
    location: "",
    coverage: {
        maxDistance: 0,
        cities: [],
    },
    services: [],
    aboutMe: "",
    gallery: [],
    hasChangesForm: false,
    hasModifiedData: false,
    shouldSave: false,
    completionStatus: {
        logo: false,
        about: false,
        services: false,
        gallery: false,
        information: false,
    },
    deletedImages: [],
};
// Acciones iniciales
export type ServiceProviderAction =
    | { type: 'UPDATE_NAME'; enterpriseName: string }
    | { type: 'UPDATE_LOGO'; logo: Image }
    | { type: 'UPDATE_ABOUT_ME'; aboutMe: string }
    | { type: 'UPDATE_SERVICES'; services: string[] }
    | { type: 'UPDATE_INFORMATION'; information: InformationFormData }
    | { type: 'UPDATE_GALLERY'; gallery: Image[] }
    | { type: 'MARK_SECTION_COMPLETE'; section: keyof CompletionStatus; completed: boolean }
    | { type: 'TRIGGER_SAVE' }
    | { type: 'RESET_SHOULD_SAVE' }
    | { type: 'RESET_FORM_CHANGED' }
    | { type: 'SET_FORM_CHANGED' }
    | { type: 'RESET_MODIFIED_DATA' }
    | { type: 'ADD_DELETED_IMAGE'; url: string }
    | { type: 'RESET_DELETED_IMAGES' }
    | { type: 'SET_NEW_DATA'; data: ServiceProviderData }
    | { type: 'SET_COMPLETION_STATUS'; completionStatus: CompletionStatus };

export const serviceProviderReducer = (state: ServiceProviderPageConfig, action: ServiceProviderAction): ServiceProviderPageConfig => {
    switch (action.type) {

        case 'UPDATE_LOGO':
            return {
                ...state,
                logo: action.logo,
                hasModifiedData: true,
            };

        case 'UPDATE_ABOUT_ME':
            return {
                ...state,
                aboutMe: action.aboutMe,
                hasModifiedData: true,
            };

        case 'UPDATE_SERVICES':
            return {
                ...state,
                services: action.services,
                hasModifiedData: true,
            };

        case 'UPDATE_INFORMATION':
            return {
                ...state,
                enterpriseName: action.information.enterpriseName,
                serviceCategories: action.information.serviceCategories,
                phone: action.information.phone,
                whatsapp: action.information.whatsapp,
                email: action.information.email,
                location: action.information.location,
                coverage: {
                    maxDistance: action.information.coverage.maxDistance,
                    cities: action.information.coverage.cities,
                },
                hasModifiedData: true,
            };

        case 'UPDATE_GALLERY':
            return {
                ...state,
                gallery: action.gallery,
                hasModifiedData: true,
            };

        case 'MARK_SECTION_COMPLETE':
            return state;
        case "TRIGGER_SAVE":
            return { ...state, shouldSave: true };

        case "RESET_SHOULD_SAVE":
            return { ...state, shouldSave: false };

        case "RESET_FORM_CHANGED":
            return {
                ...state,
                hasChangesForm: false,
            };
        case "SET_FORM_CHANGED":
            return {
                ...state,
                hasChangesForm: true,
            };
        case "RESET_MODIFIED_DATA":
            return {
                ...state,
                hasModifiedData: false,
            };
        case 'ADD_DELETED_IMAGE':
            return {
                ...state,
                deletedImages: [...state.deletedImages, action.url],
                hasModifiedData: true,
            };
        case 'RESET_DELETED_IMAGES':
            return {
                ...state,
                deletedImages: [],
            };
        case 'SET_NEW_DATA':
            return {
                ...initialStateServiceProviderPage,
                ...action.data,
            };
        case 'SET_COMPLETION_STATUS':
            return {
                ...state,
                completionStatus: action.completionStatus,
            };
        default:
            return state;
    }
}