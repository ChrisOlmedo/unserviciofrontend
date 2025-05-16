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

    const handleClose = () => {
        if (hasChangesForm().hasChangesForm) {
            setShowConfirmModal(true); // Mostrar modal de confirmación
        } else {
            navigate("../../"); // Regresar a la página anterior
        }
    };
    const handleSave = () => {
        triggerSave(); // Llama a la función de guardar cambiando el estado
    };

    const handleConfirmClose = () => {
        setShowConfirmModal(false);
        hasChangesForm().setHasChangesForm(false); // Reiniciar el estado de cambios
        navigate("../../"); // Regresar a la página anterior
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
                        <Component />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={styles.buttonsModal}>
                        <CancelButton onClick={handleClose} />
                        <SaveButton onClick={handleSave} />
                    </div>
                </Modal.Footer>
            </Modal>

            {showConfirmModal && <ConfirmModal onCancel={() => { setShowConfirmModal(false) }} onDiscard={handleConfirmClose} />}
        </>

    );
}


export default FormModal;