import { useState } from "react";
import Modal from "../../../../../components/Modal/Modal";
import CancelButton from "../../../../../components/Button/CancelButton";
import SaveButton from "../../../../../components/Button/SaveButton";
import ConfirmModal from "../../../../../components/Modal/ConfirmModal";
import { FORM_COMPONENTS } from "../const/formConst";
import { useServiceProvider } from "../hooks/useServiceProvider";

type FormConfig = (typeof FORM_COMPONENTS)[keyof typeof FORM_COMPONENTS];

type FormModalProps = {
    formConfig: FormConfig;
};

const FormModal = ({ formConfig }: FormModalProps) => {
    const { triggerSave } = useServiceProvider().saveForm();
    const { hasChangesForm } = useServiceProvider().hasChangesForm();

    const { title, component: Component } = formConfig;
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleClose = () => {
        if (hasChangesForm) {
            setShowConfirmModal(true); // Mostrar modal de confirmación
        } else {
            window.history.back(); // Regresar a la página anterior
        }
    };
    const handleSave = () => {
        triggerSave(); // Llama a la función de guardar cambiando el estado
    };

    const handleConfirmClose = () => {
        setShowConfirmModal(false);
        window.history.back(); // Regresar a la página anterior
    };
    return (
        <>
            <Modal onClose={handleClose}>
                <Modal.Header>
                    <h1>{title}</h1>
                </Modal.Header>
                <Modal.Body>
                    <Component />
                </Modal.Body>
                <Modal.Footer>
                    <CancelButton onClick={handleClose} />
                    <SaveButton onClick={handleSave} />
                </Modal.Footer>
            </Modal>

            {showConfirmModal && <ConfirmModal onClose={handleConfirmClose} onSave={handleConfirmClose} />}
        </>

    );
}


export default FormModal;