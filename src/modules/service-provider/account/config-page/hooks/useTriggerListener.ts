import { useServiceProvider } from "./useServiceProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface useTriggerListenerProps {
    validate: () => boolean;
    onError: () => void;
    onSave: () => void;
}

export const useTriggerListener = ({ validate, onError, onSave }: useTriggerListenerProps) => {
    const { shouldSave, resetShouldSave, hasChangesForm, setHasChangesForm } = useServiceProvider();
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldSave) {
            if (validate()) {
                onSave();
                resetShouldSave();
                if (hasChangesForm) {
                    setHasChangesForm(false);
                }
                navigate("../../");
            } else {
                onError();
                resetShouldSave();
            }
        }
    }, [shouldSave, validate, onSave, onError, resetShouldSave, hasChangesForm, setHasChangesForm, navigate]);
}



