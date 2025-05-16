import Modal from "./Modal";
import styles from "./confirmModal.module.css";

interface ConfirmModalProps {
    onCancel: () => void;
    onDiscard: () => void;
}

const ConfirmModal = ({ onCancel, onDiscard }: ConfirmModalProps) => {

    const handleCancel = () => {
        onCancel();
    };

    const handleDiscard = () => {
        onDiscard();
    };

    return (
        <Modal onClose={handleCancel}>
            <Modal.Header>
                <div className={styles.titleModal}>
                    <h3>Descartar cambios</h3>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.bodyModal}>
                    <p>¿Deseas descartar los cambios?</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={styles.buttonsModal}>
                    <button onClick={handleCancel}>Cancelar</button>
                    <button onClick={handleDiscard}>Descartar</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
export default ConfirmModal;
