import { useServiceProviderContext } from '../context/ServiceProviderConfigContext.tsx';
import { CompletionStatus } from '../../../../../types/types'; // Adjust the path as needed
import { Image, InformationFormData } from '../../../../../types/types';


export const useServiceProvider = () => {

    const { serviceProviderState, ServiceProviderDispatch } = useServiceProviderContext();

    // sections 
    const logoSection = () => {
        const { logo } = serviceProviderState;
        return {
            logo,
            updateLogo: (value: Image) => {
                ServiceProviderDispatch({ type: 'UPDATE_LOGO', logo: value });
            },
        };
    }

    const aboutMeSection = () => {
        const { aboutMe } = serviceProviderState;
        return {
            aboutMe,
            updateAboutMe: (value: string) => {
                ServiceProviderDispatch({ type: 'UPDATE_ABOUT_ME', aboutMe: value });
            },
        };
    }

    const servicesSection = () => {
        const { services } = serviceProviderState;
        return {
            services,
            updateServices: (value: string[]) => {
                ServiceProviderDispatch({ type: 'UPDATE_SERVICES', services: value });
            },
        };
    }

    const informationSection = () => {
        const { enterpriseName, serviceCategories, phone, whatsapp, email, location, coverage } = serviceProviderState;
        const information: InformationFormData = {
            enterpriseName,
            serviceCategories,
            phone,
            whatsapp,
            email,
            location,
            coverage,
        };
        return {
            information,
            updateInformation: (value: InformationFormData) => {
                ServiceProviderDispatch({ type: 'UPDATE_INFORMATION', information: value });
            },
        };
    }



    const gallerySection = () => {
        const { gallery } = serviceProviderState;
        return {
            gallery,
            updateGallery: (value: Image[]) => {
                ServiceProviderDispatch({ type: 'UPDATE_GALLERY', gallery: value });
            },
        };
    }


    // configuration 
    const completionStatus = () => {
        const { completionStatus } = serviceProviderState;
        return {
            completionStatus,
            updateCompletionStatus: (field: keyof CompletionStatus, value: boolean) => {
                ServiceProviderDispatch({ type: 'MARK_SECTION_COMPLETE', section: field, completed: value });
            },
        };
    }

    const saveForm = () => {
        const { shouldSave } = serviceProviderState;
        return {
            shouldSave,
            triggerSave: () => {
                ServiceProviderDispatch({ type: 'TRIGGER_SAVE' });
            },
            resetShouldSave: () => {
                ServiceProviderDispatch({ type: 'RESET_SHOULD_SAVE' });
            },
        };
    }

    const hasChangesForm = () => {
        const { hasChangesForm } = serviceProviderState;
        return {
            hasChangesForm,
            setHasChangesForm: (value: boolean) => {
                ServiceProviderDispatch({ type: value ? 'SET_FORM_CHANGED' : 'RESET_FORM_CHANGED' });
            },
        };
    }


    return {
        logoSection,
        serviceProviderState,
        ServiceProviderDispatch,
        aboutMeSection,
        servicesSection,
        informationSection,
        gallerySection,
        completionStatus,
        saveForm,
        hasChangesForm,
    }

} 