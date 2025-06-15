import ServiceProviderIndex from "modules/service-provider/components/ServiceProviderIndex";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "modules/user/context/userContext";
import { useServiceProvider } from "modules/service-provider/account/config-page/hooks/useServiceProvider";
import { CompletionStatus } from "types";
import styles from "./ServiceProviderConfigPage.module.css";
import { createServiceProviderProfile, updateServiceProviderProfile, deleteServiceProviderProfile } from "modules/service-provider/services";
import { buildServiceProviderFormData } from "../utils/formData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from 'components/Button/PrimaryButton';
import { routePaths } from "router/routePaths";
import { FaEye, FaLink } from 'react-icons/fa';
import ConfirmModal from "components/Modal/ConfirmModal";
import DangerButton from "components/Button/DangerButton";

// --- Sub-componentes de la Página ---

interface PageHeaderProps {
    userRole: string | undefined;
    onViewPage: () => void;
}
const PageHeader = ({ userRole, onViewPage }: PageHeaderProps) => (
    <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
            {userRole === "service-provider" ? "Editor de Perfil" : "Crea tu Perfil de Proveedor"}
        </h1>
        {userRole === "service-provider" && (
            <div className={styles.headerActions}>
                <PrimaryButton onClick={onViewPage}>
                    <FaEye style={{ marginRight: '8px' }} />
                    Ver mi página
                </PrimaryButton>
            </div>
        )}
    </div>
);

interface PublicUrlCardProps {
    publicUrl: string;
    onCopyUrl: () => void;
}
const PublicUrlCard = ({ publicUrl, onCopyUrl }: PublicUrlCardProps) => (
    <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Tu Página Pública</h2>
        <p className={styles.sectionDescription}>
            Este es el enlace directo a tu perfil. Cópialo y compártelo en tus redes sociales o WhatsApp para que nuevos clientes te encuentren.
        </p>
        <div className={styles.urlGroup}>
            <div className={styles.publicUrlDisplay}>
                <span>{window.location.origin + publicUrl}</span>
            </div>
            <button className={styles.copyButton} onClick={onCopyUrl} title="Copiar enlace público">
                <FaLink />
            </button>
        </div>
    </div>
);

interface MainActionCardProps {
    isUpdate: boolean;
    isLoading: boolean;
    hasModifiedData: boolean;
    onSubmit: () => void;
}
const MainActionCard = ({ isUpdate, isLoading, hasModifiedData, onSubmit }: MainActionCardProps) => (
    <div className={`${styles.sectionContainer} ${styles.actionButtonContainer}`}>
        {isUpdate ? (
            <PrimaryButton onClick={onSubmit} disabled={isLoading || !hasModifiedData}>
                {isLoading ? "Guardando..." : "Actualizar página"}
            </PrimaryButton>
        ) : (
            <PrimaryButton onClick={onSubmit} disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear página"}
            </PrimaryButton>
        )}
    </div>
);

interface DangerZoneCardProps {
    onDelete: () => void;
}
const DangerZoneCard = ({ onDelete }: DangerZoneCardProps) => (
    <div className={`${styles.sectionContainer} ${styles.dangerZone}`}>
        <div className={styles.dangerHeader}>
            <h2 className={styles.sectionTitle}>Zona de Peligro</h2>
            <p className={styles.sectionDescription}>
                Estas acciones son destructivas y no se pueden revertir.
            </p>
        </div>
        <DangerButton onClick={onDelete}>
            Eliminar mi perfil
        </DangerButton>
    </div>
);


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
    const serviceProviderData = useServiceProvider();
    const { completionStatus, hasModifiedData, slug, ServiceProviderDispatch } = serviceProviderData;
    const navigate = useNavigate();
    // Estados locales
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Construye la url pública del proveedor
    const publicUrl = slug ? routePaths.serviceProvider.public(slug) : routePaths.notFound;

    /**
     * Copia la URL pública al portapapeles.
     */
    const handleCopyPublicUrl = () => {
        const fullUrl = window.location.origin + publicUrl;
        navigator.clipboard.writeText(fullUrl);
        toast.info("Enlace copiado al portapapeles");
    };

    const isUpdate = userState.user?.role === "service-provider";
    
    /**
     * Maneja la creación o actualización del perfil del service provider.
     */
    const handleSubmit = async () => {
        if (!isUpdate) {
            const missing = getMissingFields(completionStatus);
            if (missing.length > 0) {
                missing.forEach(field => toast.error(`Falta completar: ${field}`));
                return;
            }
        }

        setIsLoading(true);
        try {
            const formData = buildServiceProviderFormData(serviceProviderData, isUpdate);
            if (isUpdate) {
                const updatedData = await updateServiceProviderProfile(formData);
                toast.success("¡Perfil actualizado exitosamente!");
                ServiceProviderDispatch({ type: 'SET_NEW_DATA', data: updatedData });
            } else {
                const response = await createServiceProviderProfile(formData);
                if (response) {  // Asumiendo que createServiceProviderProfile retorna algo si fue exitoso
                    
                    toast.success("¡Perfil creado exitosamente!");
                    toast.info("Serás redirigido en breve...", {
                        onClose: async () => {
                            if (fetchUser) {
                                await fetchUser();
                            }
                            navigate(routePaths.account.serviceProvider.edit, { replace: true });
                        }
                    });
                }
            }
        } catch (error) {
            const action = isUpdate ? "actualizar" : "crear";
            toast.error(`Error al ${action} el perfil. Intenta nuevamente.`);
            console.error(`Error al ${action} el perfil:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Maneja la eliminación del perfil del service provider.
     */
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await deleteServiceProviderProfile();
            toast.success("Perfil eliminado exitosamente.");
            if (fetchUser) await fetchUser();
            setIsDeleteModalOpen(false);
            navigate(routePaths.account.profile); 
        } catch (error) {
            toast.error("Error al eliminar el perfil. Intenta nuevamente.");
            console.error("Error al eliminar el perfil:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            {isDeleteModalOpen && (
                <ConfirmModal 
                    title="Confirmar Eliminación"
                    message="¿Estás seguro de que quieres eliminar tu perfil? Esta acción es permanente y no se puede deshacer."
                    onConfirm={handleDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    confirmText="Sí, eliminar"
                    cancelText="Cancelar"
                />
            )}
            
            <PageHeader 
                userRole={userState.user?.role}
                onViewPage={() => window.open(publicUrl, '_blank', 'noopener,noreferrer')}
            />

            {isUpdate && slug && (
                <PublicUrlCard 
                    publicUrl={publicUrl}
                    onCopyUrl={handleCopyPublicUrl}
                />
            )}
            
            <div className={styles.sectionContainer}>
                <ServiceProviderIndex serviceProviderData={serviceProviderData} isConfig={true} />
                <Outlet />
            </div>
            
            <MainActionCard 
                isUpdate={isUpdate}
                isLoading={isLoading}
                hasModifiedData={hasModifiedData}
                onSubmit={handleSubmit}
            />

            {isUpdate && (
                <DangerZoneCard onDelete={() => setIsDeleteModalOpen(true)} />
            )}

            <ToastContainer />
        </div>
    );
}

export default ServiceProviderConfigPage;