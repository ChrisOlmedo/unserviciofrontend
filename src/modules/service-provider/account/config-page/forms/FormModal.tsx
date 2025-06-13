import styles from "./formModal.module.css";
import { Suspense, lazy } from "react";
import Modal from "components/Modal/Modal";
import CancelButton from "components/Button/CancelButton";
import SaveButton from "components/Button/ConfirmButton";
import ConfirmModal from "components/Modal/ConfirmModal";
import { FORM_COMPONENTS } from "../const/formConst";
import { useFormModal } from "../hooks/useFormModal";

type FormConfig = (typeof FORM_COMPONENTS)[keyof typeof FORM_COMPONENTS];

type FormModalProps = {
    formConfig: FormConfig;
};

const FormModal = ({ formConfig }: FormModalProps) => {
    const { 
        showConfirmModal, 
        isLoading, 
        error, 
        handleClose, 
        handleSave, 
        handleConfirmClose,
        setShowConfirmModal
    } = useFormModal();

    const { title, component: Component } = formConfig;

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
                        <Suspense fallback={<div>Loading...</div>}>
                            <Component />
                        </Suspense>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={styles.buttonsModal}>
                        <CancelButton onClick={handleClose} disabled={isLoading}>
                            Cancelar
                        </CancelButton>
                        <SaveButton onClick={handleSave} disabled={isLoading}>
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