import ServiceProviderIndex from "modules/service-provider/components/ServiceProviderIndex";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "modules/user/context/userContext";
import { useServiceProvider } from "modules/service-provider/account/config-page/hooks/useServiceProvider";
import { CompletionStatus } from "types";
import styles from "./ServiceProviderConfigPage.module.css";
import { createServiceProviderProfile, updateServiceProviderProfile } from "modules/service-provider/services";
import { buildServiceProviderFormData } from "../utils/formData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from 'components/Button/PrimaryButton';
import { routePaths } from "router/routePaths";
import Loading from "components/Loader/Loader";
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
            await createServiceProviderProfile(
                buildServiceProviderFormData(serviceProviderState, false)
            );

            // Primero actualizamos el usuario
            if (fetchUser) {
                await fetchUser();
            }

            // Luego mostramos el mensaje de éxito
            toast.success("¡Perfil creado exitosamente!");

            // Finalmente redirigimos
            navigate(routePaths.account.serviceProvider.edit, { replace: true });
        } catch (error) {
            toast.error("Error al crear el perfil. Intenta nuevamente.");
            console.error("Error al crear el perfil:", error);
        } finally {
            setIsLoading(false);
        }
    };


    // Construye la url pública del proveedor
    const publicUrl = serviceProviderState.slug 
        ? routePaths.serviceProvider.public(serviceProviderState.slug)
        : routePaths.notFound;

    return (
        <>
        {/* Si el usuario es service-provider, mostrar botón para ver página y la url pública */}
        {userState.user?.role === "service-provider" && serviceProviderState.slug && (
            <div className={styles.publicUrlContainer}>
                <PrimaryButton
                    onClick={() => navigate(publicUrl)}
                    style={{ marginRight: '1em' }}
                >
                    Ver mi página pública
                </PrimaryButton>
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
        <div className={styles.actionButtonContainer}>
            {userState.user?.role === "service-provider" ? (
                <PrimaryButton
                    onClick={handleUpdate}
                    disabled={isLoading || !hasModifiedData}
                >
                    {isLoading ? "Guardando..." : "Actualizar página"}
                </PrimaryButton>
            ) : (
                <PrimaryButton
                    onClick={handleCreate}
                    disabled={isLoading}
                >
                    {isLoading ? "Creando..." : "Crear página"}
                </PrimaryButton>
            )}
        </div>
        <ToastContainer />
        </>
    );
}

export default ServiceProviderConfigPage;

