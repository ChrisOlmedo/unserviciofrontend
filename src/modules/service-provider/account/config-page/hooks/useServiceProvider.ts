import { useServiceProviderContext } from '../context/ServiceProviderConfigContext.tsx';
import { CompletionStatus, Image, InformationFormData } from "types";
import { useCallback, useMemo } from 'react';

export const useServiceProvider = () => {
    const { serviceProviderState, ServiceProviderDispatch } = useServiceProviderContext();

    // --- Selectores de Estado (Valores) ---
    // Usamos useMemo con dependencias granulares para que el objeto solo se recalcule cuando uno de sus valores realmente cambie.
    const informationData = useMemo<InformationFormData>(() => ({
        enterpriseName: serviceProviderState.enterpriseName,
        serviceCategories: serviceProviderState.serviceCategories,
        phone: serviceProviderState.phone,
        whatsapp: serviceProviderState.whatsapp,
        email: serviceProviderState.email,
        location: serviceProviderState.location,
        coverage: serviceProviderState.coverage,
        canEditEnterpriseName: serviceProviderState.canEditEnterpriseName,
    }), [
        serviceProviderState.enterpriseName,
        serviceProviderState.serviceCategories,
        serviceProviderState.phone,
        serviceProviderState.whatsapp,
        serviceProviderState.email,
        serviceProviderState.location,
        serviceProviderState.coverage,
        serviceProviderState.canEditEnterpriseName,
    ]);

    // --- Actualizadores de Estado (Funciones Estables) ---
    // Envolvemos todos los dispatchers en useCallback para que sus referencias sean estables.
    const updateLogo = useCallback((value: Image) => {
        ServiceProviderDispatch({ type: 'UPDATE_LOGO', logo: value });
    }, [ServiceProviderDispatch]);

    const updateAboutMe = useCallback((value: string) => {
        ServiceProviderDispatch({ type: 'UPDATE_ABOUT_ME', aboutMe: value });
    }, [ServiceProviderDispatch]);

    const updateServices = useCallback((value: string[]) => {
        ServiceProviderDispatch({ type: 'UPDATE_SERVICES', services: value });
    }, [ServiceProviderDispatch]);

    const updateInformation = useCallback((value: InformationFormData) => {
        ServiceProviderDispatch({ type: 'UPDATE_INFORMATION', information: value });
    }, [ServiceProviderDispatch]);

    const updateGallery = useCallback((value: Image[]) => {
        ServiceProviderDispatch({ type: 'UPDATE_GALLERY', gallery: value });
    }, [ServiceProviderDispatch]);
    
    const updateCompletionStatus = useCallback((field: keyof CompletionStatus, value: boolean) => {
        ServiceProviderDispatch({ type: 'MARK_SECTION_COMPLETE', section: field, completed: value });
    }, [ServiceProviderDispatch]);

    const triggerSave = useCallback(() => {
        ServiceProviderDispatch({ type: 'TRIGGER_SAVE' });
    }, [ServiceProviderDispatch]);

    const resetShouldSave = useCallback(() => {
        ServiceProviderDispatch({ type: 'RESET_SHOULD_SAVE' });
    }, [ServiceProviderDispatch]);

    const setHasChangesForm = useCallback((value: boolean) => {
        ServiceProviderDispatch({ type: value ? 'SET_FORM_CHANGED' : 'RESET_FORM_CHANGED' });
    }, [ServiceProviderDispatch]);

    const addDeletedImage = useCallback((urlOrId: string) => {
        ServiceProviderDispatch({ type: 'ADD_DELETED_IMAGE', url: urlOrId });
    }, [ServiceProviderDispatch]);
    
    const resetDeletedImages = useCallback(() => {
        ServiceProviderDispatch({ type: 'RESET_DELETED_IMAGES' });
    }, [ServiceProviderDispatch]);

    // Devolvemos un único objeto plano
    return {
        // Estado completo (para referencias directas si es necesario)
        ...serviceProviderState,

        // Selectores de estado derivados y memorizados
        informationData,

        // Funciones de actualización estables
        updateLogo,
        updateAboutMe,
        updateServices,
        updateInformation,
        updateGallery,
        updateCompletionStatus,
        triggerSave,
        resetShouldSave,
        setHasChangesForm,
        addDeletedImage,
        resetDeletedImages,
        
        // Exportamos el dispatch para casos específicos
        ServiceProviderDispatch,
    };
} 