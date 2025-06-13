import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServiceProvider } from './useServiceProvider';

export const useFormModal = () => {
    const navigate = useNavigate();

    const { triggerSave } = useServiceProvider().saveForm(); 
    const { hasChangesForm } = useServiceProvider();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        if (hasChangesForm().hasChangesForm) {
            setShowConfirmModal(true);
        } else {
            navigate("../../");
        }
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await triggerSave(); // Esta funcion activa la bandera para guardar el form renderizado
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred while saving");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmClose = () => {
        setShowConfirmModal(false);
        hasChangesForm().setHasChangesForm(false);
        navigate("../../");
    };

    return {
        showConfirmModal,
        isLoading,
        error,
        handleClose,
        handleSave,
        handleConfirmClose,
        setShowConfirmModal
    };
}; 