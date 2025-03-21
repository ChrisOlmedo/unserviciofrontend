import { useState } from "react";
import EditarModal from "../../../components/ServiceProviderForm/ConfigModal.tsx";
import HandleModalConfig from "../../../hooks/HandleModalConfig.tsx";
import { ServicePage } from '../../../types/types';
import dataPage from '../../../types/providerData.json'
import ServiceProviderIndex from "../../../components/ServiceProviderSectionPage/ServiceProviderIndex.tsx";
function ServiceProviderPageConfig() {
    const [datos, setDatos] = useState({
        nombre: "",
        descripcion: "",
        contacto: "",
    });

    //const [isMofified, setIsModified] = useState(false);
    const dataService: ServicePage = dataPage[0];
    const [showModal, setShowModal] = useState(false);
    const [campoEditando, setCampoEditando] = useState("");
    const handleGuardar = () => {
        // Lógica para guardar los cambios
        console.log("Datos guardados:", datos);
        setShowModal(false);
    };

    const handleModalEdith = (campo: string) => {
        setCampoEditando(campo);
        setShowModal(true);
    };
    /* Cambiar a rutas dinámicas
    import { useNavigate, useParams, Routes, Route } from 'react-router-dom';
    const navigate = useNavigate();

    const handleModalEdith = (campo: string) => {
        navigate(`/edit/${campo}`);
    }
        */

    return (
        <>
            <ServiceProviderIndex serviceProviderData={dataService} isConfig={true} handleModalEdith={handleModalEdith} />
            {/* Crear un contexto para compartir hasBeenModified y su set, que indica que cualquier input ha sido modificado*/}
            {showModal && (
                <EditarModal onClose={() => setShowModal(false)}>
                    <HandleModalConfig status={campoEditando} setDatos={setDatos} datos={datos} />
                </EditarModal>
            )}

        </>
        /* Cambiar a rutas dinámicas
            <Routes>
                <Route path="/edit/:campo" element={
                    <EditarModal onClose={() => navigate(-1)}> // Usa navigate(-1) para cerrar el modal 
                        <HandleModalConfig status={useParams().campo} setDatos={setDatos} datos={datos} />
                    </EditarModal>
                } />
            </Routes>
        */
    );
}

export default ServiceProviderPageConfig;