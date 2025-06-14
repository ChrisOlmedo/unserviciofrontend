import { useState } from "react";
import { useTriggerListener } from "../../hooks/useTriggerListener";
import { useServiceProvider } from "../../hooks/useServiceProvider";
import styles from './ServicesForm.module.css';
import ErrorMessage from "components/ErrorInput/ErrorMessage";
import { useFormChangeTracker } from "../../hooks/useFormChangeTracker";

const ServicesForm = () => {
    const { services: initialServices, updateServices } = useServiceProvider();
    const [newService, setNewService] = useState("");
    const [services, setServices] = useState<string[]>(initialServices || []);
    const [error, setError] = useState(false);

    useFormChangeTracker({
        localData: services,
        initialData: initialServices || []
    });

    const handleAddService = () => {
        if (newService.trim()) {
            setServices([...services, newService.trim()]);
            setNewService("");
            if (error) setError(false);
        }
    };

    const handleDeleteService = (index: number) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
    };

    useTriggerListener({
        validate: () => {
            if (services.length === 0) {
                setError(true);
                return false;
            }
            return true;
        },
        onError: () => {}, // La validación ya setea el error
        onSave: () => {
            updateServices(services);
        },
    });

    return (
        <div className={styles.serviceEditor}>
            <h2>📝 Mis Servicios</h2>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Ej: Instalación eléctrica"
                    className={styles.serviceInput}
                    onKeyPress={(e) => e.key === "Enter" && handleAddService()}
                />
                <button onClick={handleAddService} className={styles.addButton}>
                    Agregar
                </button>
            </div>
            {error && <ErrorMessage message="Debes agregar al menos un servicio." />}

            <ul className={styles.servicesList}>
                {services.map((service, index) => (
                    <li key={index} className={styles.serviceItem}>
                        {service}
                        <button
                            onClick={() => handleDeleteService(index)}
                            className={styles.deleteButton}
                        >
                            🗑
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServicesForm;
