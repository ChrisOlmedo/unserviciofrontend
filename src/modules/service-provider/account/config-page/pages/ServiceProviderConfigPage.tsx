import ServiceProviderIndex from "modules/service-provider/components/ServiceProviderIndex";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Modal from "components/Modal/Modal";
import { useUser } from "modules/user/context/userContext";
import { useServiceProvider } from "modules/service-provider/account/config-page/hooks/useServiceProvider";
import { CompletionStatus } from "types";
import styles from "./ServiceProviderConfigPage.module.css";
import { createServiceProviderProfile, updateServiceProviderProfile } from "modules/service-provider/services";

/**
 * Devuelve un array con los nombres de los campos obligatorios que faltan completar.
 * @param completionStatus Estado de completitud de los campos del service provider
 */
function getMissingFields(completionStatus: CompletionStatus): string[] {
    const requiredFields = [
        { key: "logo", label: "Logo" },
        { key: "about", label: "Sobre mí" },
        { key: "services", label: "Servicios" },
        { key: "gallery", label: "Galería" },
        { key: "information", label: "Información de contacto" },
    ];
    return requiredFields
        .filter(field => !completionStatus[field.key as keyof CompletionStatus])
        .map(field => field.label);
}

/**
 * Página de configuración del Service Provider.
 * Permite crear o actualizar la página del proveedor de servicios.
 */
function ServiceProviderConfigPage() {
    // Contextos globales
    const { userState } = useUser();
    const { getApiPayload, serviceProviderState } = useServiceProvider();
    const { completionStatus, hasModifiedData } = serviceProviderState;

    // Estados locales
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [showMissingFieldsModal, setShowMissingFieldsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Datos filtrados para enviar al backend
    const serviceProviderData = getApiPayload();

    /**
     * Maneja la actualización del perfil del service provider.
     * Solo disponible para usuarios con rol 'service-provider'.
     */
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateServiceProviderProfile(serviceProviderData);
            // TODO: Mostrar notificación de éxito
        } catch (error) {
            // TODO: Mostrar notificación de error
            console.error("Error al actualizar el perfil:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Maneja la creación del perfil del service provider.
     * Solo disponible para usuarios que no son 'service-provider'.
     */
    const handleCreate = async () => {
        const missing = getMissingFields(completionStatus);
        if (missing.length > 0) {
            setMissingFields(missing);
            setShowMissingFieldsModal(true);
            return;
        }
        setIsLoading(true);
        try {
            await createServiceProviderProfile(serviceProviderData);
            // TODO: Mostrar notificación de éxito
        } catch (error) {
            // TODO: Mostrar notificación de error
            console.error("Error al crear el perfil:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Vista principal del proveedor de servicios en modo configuración */}
            <ServiceProviderIndex serviceProviderData={serviceProviderData} isConfig={true} />
            {/* Outlet para subrutas de configuración */}
            <Outlet />
            
            {/* Botón principal de acción: actualizar o crear según el rol */}
            {userState.user?.role === "service-provider" ? (
                <button
                    onClick={handleUpdate}
                    className={styles.mainActionButton}
                    disabled={isLoading || !hasModifiedData}
                >
                    {isLoading ? "Guardando..." : "Actualizar página"}
                </button>
            ) : (
                <button
                    onClick={handleCreate}
                    className={styles.mainActionButton}
                    disabled={isLoading}
                >
                    {isLoading ? "Creando..." : "Crear página"}
                </button>
            )}

            {/* Modal para mostrar campos obligatorios faltantes */}
            {showMissingFieldsModal && (
                <Modal onClose={() => setShowMissingFieldsModal(false)}>
                    <Modal.Header>
                        <h2 className={styles.missingFieldsTitle}>Campos obligatorios faltantes</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.missingFieldsBody}>
                            <p>Faltan los siguientes campos obligatorios:</p>
                            <ul className={styles.missingFieldsList}>
                                {missingFields.map(field => (
                                    <li key={field}>{field}</li>
                                ))}
                            </ul>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={() => setShowMissingFieldsModal(false)}
                            className={styles.missingFieldsButton}
                        >
                            OK
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export default ServiceProviderConfigPage;

