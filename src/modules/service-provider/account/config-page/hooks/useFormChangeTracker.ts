import { useEffect } from 'react';
import { useServiceProvider } from './useServiceProvider';

interface UseFormChangeTrackerProps<T> {
    localData: T;
    initialData: T;
}

/**
 * Hook personalizado para rastrear cambios entre el estado local de un formulario
 * y su estado inicial proveniente de un contexto o props.
 * @param localData El estado actual del formulario.
 * @param initialData El estado original con el que comparar.
 */
export const useFormChangeTracker = <T>({ 
    localData, 
    initialData
}: UseFormChangeTrackerProps<T>) => {
    
    const { setHasChangesForm } = useServiceProvider();
    
    useEffect(() => {
        const hasChanged = JSON.stringify(localData) !== JSON.stringify(initialData);
        setHasChangesForm(hasChanged);
    }, [localData, initialData, setHasChangesForm]);
}; 