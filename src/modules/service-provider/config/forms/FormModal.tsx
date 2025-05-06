import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import CancelButton from "../../../../components/Button/CancelButton";
import SaveButton from "../../../../components/Button/SaveButton";

import { FORM_COMPONENTS } from "../const/formConst";

type FormConfig = (typeof FORM_COMPONENTS)[keyof typeof FORM_COMPONENTS];

type FormModalProps = {
    formConfig: FormConfig;
};

const FormModal = ({ formConfig }: FormModalProps) => {

    const { title, component: Component } = formConfig;
    //const { hasBeenChanged, setHasBeenChanged } = useModal();
    const [hasBeenChanged, setHasBeenChanged] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleClose = () => {
        if (hasBeenChanged) {
            setShowConfirmModal(true); // Mostrar modal de confirmación
        } else {
            window.history.back(); // Regresar a la página anterior
        }
    };
    const handleSave = () => {
        window.history.back();
    };

    const handleConfirmClose = () => {
        setHasBeenChanged(false); // Reseteamos el estado
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
                    {/* <Component /> */}
                </Modal.Body>
                <Modal.Footer>
                    <CancelButton onClick={handleClose} />
                    <SaveButton onClick={handleSave} />
                </Modal.Footer>
            </Modal>

            {showConfirmModal && (
                <Modal onClose={() => setShowConfirmModal(false)}>
                    <Modal.Header>
                        <h2>Descartar cambios</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Deseas descartar los cambios?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setShowConfirmModal(false)}>Cancelar</button>
                        <button onClick={handleConfirmClose}>Descartar</button>
                    </Modal.Footer>
                </Modal>
            )
            }
        </>

    );
}


export default FormModal;