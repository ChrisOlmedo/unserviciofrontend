import { useState } from "react";
import EditarModal from "../../../components/ServiceProviderForm/Modal";
import HandleModalConfig from "../../../hooks/HandleModalConfig";
import { ServicePage } from '../../../types/types';
import dataPage from '../../../types/providerData.json'
import ServiceProviderIndex from "../../../components/ServiceProviderSectionPage/ServiceProviderIndex";
function ServiceProviderPageConfig() {
    const [datos, setDatos] = useState({
        nombre: "",
        descripcion: "",
        contacto: "",
    });

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

    return (
        <>
            <ServiceProviderIndex serviceProviderData={dataService} isConfig={true} handleModalEdith={handleModalEdith} />

            {showModal && (
                <EditarModal onClose={() => setShowModal(false)} onSave={handleGuardar}>
                    <HandleModalConfig status={campoEditando} setDatos={setDatos} datos={datos} />
                </EditarModal>
            )}
        </>
    );
}

export default ServiceProviderPageConfig;