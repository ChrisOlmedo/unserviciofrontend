import { useState } from "react";
import { useTriggerListener } from "../../hooks/useTriggerListener";
import { useServiceProvider } from "../../hooks/useServiceProvider";
import styles from './ServicesForm.module.css';

export const ServicesForm = () => {
    const [newService, setNewService] = useState("");
    const { services: savedServices, updateServices } = useServiceProvider().servicesSection();
    const [services, setServices] = useState<string[]>(savedServices || []);

    const handleAddService = () => {
        if (newService.trim()) {
            setServices([...services, newService.trim()]);
            setNewService("");
        }
    };

    const handleDeleteService = (index: number) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
    };

    useTriggerListener({
        validate: () => services.length > 0,
        onError: () => alert("Debes agregar al menos un servicio."),
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
