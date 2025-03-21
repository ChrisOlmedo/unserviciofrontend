import styles from "./modal.module.css";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}
function Modal({ onClose, children }: ModalProps) {



    //modal manejara hasBeenModified y si true manejara otro modal con la alerta de que se perderan los cambios
    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.content}>

                        {children}

                    </div>

                    <div className={styles.buttons}>
                        <button onClick={onClose} className={styles.button}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}


export default Modal;