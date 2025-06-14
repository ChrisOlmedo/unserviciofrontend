import Modal from "./Modal";
import styles from "./confirmModal.module.css";
import CancelButton from "components/Button/CancelButton";
import ConfirmButton from "components/Button/ConfirmButton";

interface ConfirmModalProps {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmModal = ({ 
    title, 
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onCancel, 
    onConfirm 
}: ConfirmModalProps) => {

    return (
        <Modal onClose={onCancel}>
            <div className={styles.confirmWrapper}>
                <Modal.Header>
                    <div className={styles.titleModal}>
                        <h3>{title}</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.bodyModal}>
                        <p>{message}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={styles.buttonsModal}>
                        <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
                        <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
                    </div>
                </Modal.Footer>
            </div>
        </Modal>
    );
}
export default ConfirmModal;
