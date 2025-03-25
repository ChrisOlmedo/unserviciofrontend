import { useState, useEffect } from "react";
// Estilos (puedes moverlos a un CSS module)
const styles = {
    serviceEditor: {
        background: "white",
        padding: "20px 80px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
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

const ServicesForm = () => {
    const [services, setServices] = useState<string[]>([]);
    const [newService, setNewService] = useState("");
    const [showSaveMessage, setShowSaveMessage] = useState(false);

    // Cargar servicios al inicio (desde localStorage o API)
    useEffect(() => {
        if (localStorage.getItem("services")) {
            const savedServices = JSON.parse(localStorage.getItem("services") || "[]");
            setServices(savedServices);
        }
    }, []);

    // Guardar servicios cuando cambian
    useEffect(() => {
        if (services.length > 0 || localStorage.getItem("services")) {
            localStorage.setItem("services", JSON.stringify(services));
        }
    }, [services]);

    // Agregar servicio
    const handleAddService = () => {
        if (newService.trim()) {
            setServices([...services, newService.trim()]);
            setNewService("");
            showTempMessage();
        }
    };

    // Eliminar servicio
    const handleDeleteService = (index: number) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
        showTempMessage();
    };

    // Mensaje temporal de "Guardado"
    const showTempMessage = () => {
        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 2000);
    };

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

            {showSaveMessage && (
                <div style={styles.saveMessage}>¡Cambios guardados!</div>
            )}

            {/* Input oculto para enviar el array en formularios */}
            <input
                type="hidden"
                name="services"
                value={JSON.stringify(services)}
            />


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

export default ServicesForm;