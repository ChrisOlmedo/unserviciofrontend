
import ServiceProviderIndex from "../../../components/ServiceProviderIndex.tsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../../../../components/Modal/Modal.tsx"; // Adjust the path as needed
import { useUser } from "../../../../user/context/userContext.tsx";
import { useServiceProvider } from "../hooks/useServiceProvider.ts";
import { CompletionStatus } from "../../../../../types/types.ts";

function validateCompletion(completionStatus: CompletionStatus): string[] {
    const missingFields: string[] = [];

    if (!completionStatus.logo) missingFields.push("Logo");
    if (!completionStatus.about) missingFields.push("Sobre mí");
    if (!completionStatus.services) missingFields.push("Servicios");
    if (!completionStatus.gallery) missingFields.push("Galería");
    if (!completionStatus.information) missingFields.push("Información de contacto");

    return missingFields;
}

function ServiceProviderConfigPage() {

    const { userState } = useUser();
    const { serviceProviderState } = useServiceProvider();
    const { completionStatus } = serviceProviderState;
    const [missingFields, setMissingFields] = useState<string[]>([]);

    const handleUpdate = () => {
        console.log("Guardando cambios...");

    };
    const [oka, setOka] = useState(false);
    const handleCreate = () => {
        const missing = validateCompletion(completionStatus);
        if (missing.length > 0) {
            setMissingFields(missing); // setMissingFields sería un estado local
            setOka(true); // Mostrar modal
            return;
        }

        console.log("Creando página...");
        console.log(serviceProviderState);
    };
    const ok = () => {
        setOka(false);
    };
    useEffect(() => {
        console.log("ServiceProviderState", serviceProviderState);

    }, []);
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
                        <p>Faltan los siguientes campos obligatorios:</p>
                        <ul>
                            {missingFields.map(field => (
                                <li key={field}>{field}</li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={ok}>OK</button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export default ServiceProviderConfigPage;

