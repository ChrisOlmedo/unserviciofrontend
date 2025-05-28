import { useServiceProvider } from "./useServiceProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface useTriggerListenerProps {
    validate: () => boolean;
    onError: () => void;
    onSave: () => void;
}

export const useTriggerListener = ({ validate, onError, onSave }: useTriggerListenerProps) => {
    const { shouldSave, resetShouldSave } = useServiceProvider().saveForm();
    const { hasChangesForm, setHasChangesForm } = useServiceProvider().hasChangesForm();

    const navigate = useNavigate();
    useEffect(() => {
        if (shouldSave) {
            if (validate()) {
                onSave();
                // Llama a resetShouldSave para reiniciar el estado
                resetShouldSave();
                // Si hasChangesForm es true, lo reinicia a false
                if (hasChangesForm) {
                    setHasChangesForm(false);
                }
                // Redirige a la página anterior
                navigate("../../");
            } else {
                onError();
                // Llama a resetShouldSave para reiniciar el estado
                resetShouldSave();
            }
        }
    }, [shouldSave]); // Asegúrate de agregar shouldSave como dependencia

}



