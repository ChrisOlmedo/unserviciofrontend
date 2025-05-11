import Modal from "./Modal";

interface ConfirmModalProps {
    onClose: () => void;
    onSave: () => void;
}

const ConfirmModal = ({ onClose, onSave }: ConfirmModalProps) => {

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        onSave();
    };

    return (
        <Modal onClose={handleClose}>
            <Modal.Header>
                <h2>Descartar cambios</h2>
            </Modal.Header>
            <Modal.Body>
                <p>¿Deseas descartar los cambios?</p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>Cancelar</button>
                <button onClick={handleSave}>Descartar</button>
            </Modal.Footer>
        </Modal>
    );
}
export default ConfirmModal;
