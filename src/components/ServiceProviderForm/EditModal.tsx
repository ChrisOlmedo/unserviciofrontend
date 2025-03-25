import { useState } from "react";
import Modal from "../Modal/Modal";
/****************************************************
 * 
 * 
 * 
 * Ya no recibira un children, sino que lo renderizara directamente, porque ya no se necesitara pasar props al children
 * en cambio se va a manejar un estado para controlar el objeto
 * 
 * 
 * 
 * 
 * 
 ****************************************************/
function EditModal({ children }: any) {

    //const { hasBeenChanged, setHasBeenChanged } = useModal();
    const [hasBeenChanged, setHasBeenChanged] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleClose = () => {
        if (hasBeenChanged) {
            setShowConfirmModal(true); // Mostrar modal de confirmación
        } else {
            window.history.back(); // Regresar a la página anterior
            // Vamos a usar ^ lo de arriba y ya no sera necesario usar onClose
            // // Cerrar modal sin preguntar
        }
    };

    const handleConfirmClose = () => {
        setHasBeenChanged(false); // Reseteamos el estado
        setShowConfirmModal(false);
        window.history.back(); // Regresar a la página anterior
        // Vamos a usar ^ lo de arriba y ya no sera necesario usar onClose
    };
    //modal manejara hasBeenModified y si true manejara otro modal con la alerta de que se perderan los cambios
    return (
        <>
            <Modal onClose={handleClose}>
                {children}
            </Modal>

            {showConfirmModal && (
                <Modal onClose={() => setShowConfirmModal(false)}>
                    <h2>Descartar cambios</h2>
                    <div>
                        <p>¿Deseas descartar los cambios?</p>
                        <button onClick={() => setShowConfirmModal(false)}>Cancelar</button>
                        <button onClick={handleConfirmClose}>Descartar</button>
                    </div>
                </Modal>
            )
            }
        </>

    );
}


export default EditModal;