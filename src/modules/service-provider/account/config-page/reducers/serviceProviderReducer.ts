import { ServiceProviderPageConfig } from '../../../../../types/types';
import { Image } from '../../../../../types/types';
import { CompletionStatus } from '../../../../../types/types';

export const initialStateServiceProviderPage: ServiceProviderPageConfig = {
    slug: "",
    enterpriseName: "",
    logo: { url: "", file: null },
    typeService: "",
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
    hasModifiedObject: false,
    shouldSave: false,
    completionStatus: {
        logo: false,
        about: false,
        services: false,
        gallery: false,
        information: false,
    },
};
// Acciones iniciales
export type ServiceProviderAction =
    | { type: 'UPDATE_NAME'; enterpriseName: string }
    | { type: 'UPDATE_LOGO'; logo: Image }
    | { type: 'UPDATE_ABOUT_ME'; aboutMe: string }
    | { type: 'MARK_SECTION_COMPLETE'; section: keyof CompletionStatus; completed: boolean }
    | { type: 'TRIGGER_SAVE' }
    | { type: 'RESET_SHOULD_SAVE' }
    | { type: 'RESET_FORM_CHANGED' }
    | { type: 'SET_FORM_CHANGED' };

export const serviceProviderReducer = (state: ServiceProviderPageConfig, action: ServiceProviderAction): ServiceProviderPageConfig => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, enterpriseName: action.enterpriseName };
        case 'UPDATE_LOGO':
            return { ...state, logo: action.logo };

        case 'UPDATE_ABOUT_ME':
            return { ...state, aboutMe: action.aboutMe };

        case 'MARK_SECTION_COMPLETE':
            return {
                ...state,
                completionStatus: {
                    ...state.completionStatus,
                    [action.section]: action.completed,
                },
            };
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