import styles from "./modal.module.css";

function EditarModal({ onClose, onSave, children }: any) {

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.content}>{children}</div>

                <div className={styles.buttons}>
                    <button onClick={onClose} className={styles.button}>
                        Cerrar
                    </button>
                    <button onClick={onSave} className={styles.button}>
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    );
}


export default EditarModal;