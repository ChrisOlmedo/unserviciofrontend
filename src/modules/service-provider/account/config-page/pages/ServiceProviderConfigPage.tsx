import ServiceProviderIndex from "modules/service-provider/components/ServiceProviderIndex";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "modules/user/context/userContext";
import { useServiceProvider } from "modules/service-provider/account/config-page/hooks/useServiceProvider";
import { CompletionStatus, ServiceProviderData } from "types";
import styles from "./ServiceProviderConfigPage.module.css";
import { createServiceProviderProfile, updateServiceProviderProfile } from "modules/service-provider/services";
import { buildServiceProviderFormData } from "../utils/formData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
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
    const { userState, fetchUser } = useUser();
    const { serviceProviderState, ServiceProviderDispatch } = useServiceProvider();
    const { completionStatus, hasModifiedData } = serviceProviderState;
    const navigate = useNavigate();
    // Estados locales
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Maneja la actualización del perfil del service provider.
     * Solo disponible para usuarios con rol 'service-provider'.
     */
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            // Espera la respuesta con los nuevos datos
            const updatedData = await updateServiceProviderProfile(buildServiceProviderFormData(serviceProviderState, true));
            toast.success("¡Perfil actualizado exitosamente!");
            console.log(updatedData);
            // Actualiza el estado global con los nuevos datos
            ServiceProviderDispatch({ type: 'SET_NEW_DATA', data: updatedData });
        } catch (error) {
            toast.error("Error al actualizar el perfil. Intenta nuevamente.");
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
            missing.forEach(field => {
                toast.error(`Falta completar: ${field}`);
            });
            return;
        }
        setIsLoading(true);
        try {
            // Espera la respuesta con los nuevos datos
            console.log(serviceProviderState);
            const createdData: ServiceProviderData = await createServiceProviderProfile(buildServiceProviderFormData(serviceProviderState, false));
            toast.success("¡Perfil creado exitosamente!");
            console.log(createdData);

            if (fetchUser) {
                await fetchUser();
            }
            
            ServiceProviderDispatch({ type: 'SET_NEW_DATA', data: createdData });
            
            useEffect(() => {
                console.log("Nuevo estado:", serviceProviderState);
            }, [serviceProviderState]);


        } catch (error) {
            toast.error("Error al crear el perfil. Intenta nuevamente.");
            console.error("Error al crear el perfil:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Construye la url pública del proveedor
    const publicUrl = `/services/${serviceProviderState.slug}`;

    return (
        <>{/* Si el usuario es service-provider, mostrar botón para ver página y la url pública */}
        {userState.user?.role === "service-provider" && (
            <div className={styles.publicUrlContainer}>
                <button
                    className={styles.viewPageButton}
                    onClick={() => navigate(publicUrl)}
                >
                    Ver mi página pública
                </button>
                <div className={styles.publicUrlInfo}>
                    <span>URL pública: </span>
                    <a href={publicUrl} target="_blank" rel="noopener noreferrer">{window.location.origin + publicUrl}</a>
                </div>
            </div>
        )}
            {/* Vista principal del proveedor de servicios en modo configuración */}
            <ServiceProviderIndex serviceProviderData={serviceProviderState} isConfig={true} />
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
            
            <ToastContainer />
        </>
    );
}

export default ServiceProviderConfigPage;

