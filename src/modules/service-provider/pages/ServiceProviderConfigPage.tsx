import { useState } from "react";
import dataPage from '../../../types/providerData.json'
import ServiceProviderIndex from "../components/ServiceProviderIndex.tsx";
import { Outlet, useParams } from "react-router-dom";
import { useUser } from "../../user/context/userContext.tsx";
import { ServicePage, User } from "../../../types/types.ts";

{/* 
                                *
                                *
                                * Proxima actualizacion, agregar al usuario un campo que contenga el slug de su pagina
                                * por defecto debera llevar un nombre como "Mi pagina" y el slug sera "mi-pagina"
                                * 
                                * const { slug } = useParams();
                                * if(slug == 'mi-pagina') { <ServiceProviderConfigPage /> boton de crear mi pagina }
                                * if(slug == user.slug) { <ServiceProviderConfigPage /> boton de actualizar mi pagina }
                                * 
                                * 
                                */}
function ServiceProviderConfigPage() {

    const { slug } = useParams();
    const { userState } = useUser();
    const [datos, setDatos] = useState({
        nombre: "",
        descripcion: "",
        contacto: "",
    });

    //const [isMofified, setIsModified] = useState(false);
    const dataService: any = dataPage[0];
    const handleGuardar = () => {
        // Lógica para guardar los cambios
        console.log("Datos guardados:", datos);
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
        <>
            <ServiceProviderIndex serviceProviderData={dataService} isConfig={true} />
            {/* Crear un contexto para compartir hasBeenModified y su set, que indica que cualquier input ha sido modificado*/}

            <Outlet />
        </>
    );
}

export default ServiceProviderConfigPage;