import styles from "./formModal.module.css";
import { useState } from "react";
import Modal from "../../../../../components/Modal/Modal";
import CancelButton from "../../../../../components/Button/CancelButton";
import SaveButton from "../../../../../components/Button/SaveButton";
import ConfirmModal from "../../../../../components/Modal/ConfirmModal";
import { FORM_COMPONENTS } from "../const/formConst";
import { useServiceProvider } from "../hooks/useServiceProvider";
import { useNavigate } from "react-router-dom";

type FormConfig = (typeof FORM_COMPONENTS)[keyof typeof FORM_COMPONENTS];

type FormModalProps = {
    formConfig: FormConfig;
};

const FormModal = ({ formConfig }: FormModalProps) => {
    const navigate = useNavigate();
    const { triggerSave } = useServiceProvider().saveForm();
    const { hasChangesForm } = useServiceProvider();

    const { title, component: Component } = formConfig;
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

    const handleSave = () => {
        try {
            setIsLoading(true);
            setError(null);
            triggerSave();
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

    return (
        <>
            <Modal onClose={handleClose}>
                <Modal.Header>
                    <div className={styles.titleModal}>
                        <h1>{title}</h1>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.bodyModal}>
                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}
                        <Component />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={styles.buttonsModal}>
                        <CancelButton onClick={handleClose} disabled={isLoading} >
                            Cancelar
                        </CancelButton>

                        <SaveButton onClick={handleSave} disabled={isLoading} >
                            Guardar
                        </SaveButton>
                    </div>
                </Modal.Footer>
            </Modal>

            {showConfirmModal && (
                <ConfirmModal
                    onCancel={() => setShowConfirmModal(false)}
                    onDiscard={handleConfirmClose}
                />
            )}
        </>
    );
};

export default FormModal;