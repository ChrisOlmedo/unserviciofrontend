import styles from "./modal.module.css";
import { MdClose } from "react-icons/md";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}
function Modal({ onClose, children }: ModalProps) {
    return (
        <>
            <div className={styles.overlay}>
                <dialog className={styles.modal}>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Cerrar">
                        <MdClose size={24} />
                    </button>
                    {children}
                </dialog>
            </div>
        </>

    );
}


// Subcomponentes (solo si los necesitas)
Modal.Header = function ({ children }: { children: React.ReactNode }) {
    return <header className={styles.header}>{children}</header>;
};

Modal.Body = function ({ children }: { children: React.ReactNode }) {
    return <div className={styles.body}>{children}</div>;
};

Modal.Footer = function ({ children }: { children: React.ReactNode }) {
    return <footer className={styles.footer}>{children}</footer>;
};


// Exportamos todo junto
export default Modal;