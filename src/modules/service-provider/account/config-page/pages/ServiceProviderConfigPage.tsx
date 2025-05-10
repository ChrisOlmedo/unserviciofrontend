
import ServiceProviderIndex from "../../../components/ServiceProviderIndex.tsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../../../components/Modal/Modal.tsx"; // Adjust the path as needed
import { useUser } from "../../../../user/context/userContext.tsx";
import { useServiceProvider } from "../hooks/useServiceProvider.ts";
import { ServiceProviderConfigProvider } from "../context/ServiceProviderConfigContext.tsx"; // Importa el contexto
function ServiceProviderConfigPage() {

    const { userState } = useUser();
    const { serviceProviderState } = useServiceProvider();
    const handleUpdate = () => {
        if (serviceProviderState.hasModifiedObject) {
            // fetch para actualizar la pagina
            console.log("Guardando cambios...");

        }
    };
    const [oka, setOka] = useState(false);
    const handleCreate = () => {
        setOka(true);
        /*aqui se escribiria el fetch para crear y esperar la respuesta
        si la respuestas es correcta, se  hace un dispatch del user para verificar
        que realmente haya sido exitoso, como?, haciendo un fetch del user para verificar
        que su rol haya cambiado y entonces actualizarlo, si no, se le muestra un error
        indicando que algo sucedio*/
        console.log("Creando página...");
    };
    const ok = () => {
        setOka(false);
    };
    /*
    const validateSlugAccess = (slug: string | undefined, user: User | null) => {
        if (!user) return "not_logged_in"; // Si no está logueado (el Layout ya redirige)
        if (user.role === "user" && slug !== "mi-pagina") return "invalid_user_access";
        if (user.role === "serviceProvider" && user.slug !== slug) return "not_owner";
        return "valid";
    };

    const accessStatus = validateSlugAccess(slug, userState.user);

    const messages = {
        not_logged_in: "Debes iniciar sesión",
        invalid_user_access: "No tienes permisos para esta página",
        not_owner: "Esta página no te pertenece",
    };
    const ErrorPage = ({ type }: { type: keyof typeof messages }) => {
        return <div>{messages[type] || "Página no encontrada"}</div>;
    };

    if (accessStatus !== "valid") {
        return <ErrorPage type={accessStatus} />; // Componente más específico
    }
*/

    return (

        <ServiceProviderConfigProvider>
            <>
                <ServiceProviderIndex serviceProviderData={serviceProviderState} isConfig={true} />
                {/* Crear un contexto para compartir hasBeenModified y su set, que indica que cualquier input ha sido modificado*/}
                <Outlet />
                {userState.user?.role === "service-provider" ? (
                    <button onClick={handleUpdate} className="btn btn-primary">Actualizar página</button>
                ) : (
                    <button onClick={handleCreate} className="btn btn-primary">Crear página</button>
                )}

                {oka && (
                    <Modal onClose={ok}>
                        <Modal.Header>
                            <h2>Error</h2>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Completa todos los campos obligatorios</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={ok}>OK</button>
                        </Modal.Footer>
                    </Modal>
                )}
            </>

        </ServiceProviderConfigProvider >
    );
}

export default ServiceProviderConfigPage;

