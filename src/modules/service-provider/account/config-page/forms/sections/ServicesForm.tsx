import { useState } from "react";
import { useTriggerListener } from "../../hooks/useTriggerListener";
import { useServiceProvider } from "../../hooks/useServiceProvider";
// Estilos (puedes moverlos a un CSS module)
const styles = {
    serviceEditor: {
        maxWidth: "600px",
        minWidth: "400px",
        margin: "0 auto",
    },
    inputGroup: {
        display: "flex",
        gap: "10px",
        marginBottom: "15px",
    },
    serviceInput: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    addButton: {
        background: "#4CAF50",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    servicesList: {
        padding: 0,
        minHeight: "50px",
    },
    serviceItem: {
        background: "#f1f8ff",
        padding: "12px",
        marginBottom: "8px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderLeft: "4px solid #3498db",
    },
    deleteButton: {
        color: "#e74c3c",
        cursor: "pointer",
        background: "none",
        border: "none",
        fontSize: "16px",
    },
    saveMessage: {
        color: "#27ae60",
        fontSize: "14px",
        marginTop: "10px",
    },
};

export const ServicesForm = () => {
    const [newService, setNewService] = useState("");
    const { services: savedServices, updateServices } = useServiceProvider().servicesSection();
    const [services, setServices] = useState<string[]>(savedServices || []);
    // Agregar servicio
    const handleAddService = () => {
        if (newService.trim()) {
            setServices([...services, newService.trim()]);
            setNewService("");
        }
    };

    // Eliminar servicio
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
        <div style={styles.serviceEditor}>
            <h2>📝 Mis Servicios</h2>
            <div style={styles.inputGroup}>
                <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Ej: Instalación eléctrica"
                    style={styles.serviceInput}
                    onKeyPress={(e) => e.key === "Enter" && handleAddService()}
                />
                <button onClick={handleAddService} style={styles.addButton}>
                    Agregar
                </button>
            </div>

            <ul style={styles.servicesList}>
                {services.map((service, index) => (
                    <li key={index} style={styles.serviceItem}>
                        {service}
                        <button
                            onClick={() => handleDeleteService(index)}
                            style={styles.deleteButton}
                        >
                            🗑
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
