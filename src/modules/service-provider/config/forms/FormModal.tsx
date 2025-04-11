import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import CancelButton from "../../../../components/Button/CancelButton";
import SaveButton from "../../../../components/Button/SaveButton";

interface FormModalProps {
    titleModal: string;
    children: React.ReactNode;
}

function FormModal({ titleModal, children }: FormModalProps) {

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

    const handleConfirmClose = () => {
        setHasBeenChanged(false); // Reseteamos el estado
        setShowConfirmModal(false);
        window.history.back(); // Regresar a la página anterior
    };
    return (
        <>
            <Modal onClose={handleClose}>
                <Modal.Header>
                    <h1>{titleModal}</h1>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <CancelButton onClick={handleClose} />
                    <SaveButton onClick={handleClose} />
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