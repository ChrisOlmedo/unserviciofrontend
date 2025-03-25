import { useState } from "react";
import { ServicePage } from '../../../types/types.ts';
import dataPage from '../../../types/providerData.json'
import ServiceProviderIndex from "../../../components/ServiceProviderPage/ServiceProviderIndex.tsx";
import { Outlet, useMatch } from "react-router-dom";


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

    const [datos, setDatos] = useState({
        nombre: "",
        descripcion: "",
        contacto: "",
    });

    //const [isMofified, setIsModified] = useState(false);
    const dataService: ServicePage = dataPage[0];
    const handleGuardar = () => {
        // Lógica para guardar los cambios
        console.log("Datos guardados:", datos);
    };


    return (
        <>
            <ServiceProviderIndex serviceProviderData={dataService} isConfig={true} />
            {/* Crear un contexto para compartir hasBeenModified y su set, que indica que cualquier input ha sido modificado*/}

            <Outlet />
        </>
    );
}

export default ServiceProviderConfigPage;