import Modal from "./Modal";
import styles from "./confirmModal.module.css";
import CancelButton from "components/Button/CancelButton";
import ConfirmButton from "components/Button/ConfirmButton";

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
                    <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
                    <ConfirmButton onClick={handleDiscard}>Descartar</ConfirmButton>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
export default ConfirmModal;
