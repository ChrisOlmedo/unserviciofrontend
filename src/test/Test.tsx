import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

function StatusConnection() {
    const [statusMessage, setStatusMessage] = useState('Conectando al backend...');
    const checkBackendConnection = async () => {
        if (!apiUrl) {
            console.error('La variable de entorno REACT_APP_API_URL no está definida.');
            setStatusMessage('Error interno: URL del backend no configurada.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/test`);
            if (response.ok) {
                const data = await response.json();
                setStatusMessage(data.message || 'Conexión exitosa, pero sin mensaje.');
            } else {
                setStatusMessage(`Error al conectar con el backend: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error al conectar con el backend:', error);
            setStatusMessage('No se pudo conectar al backend. Revisa tu conexión o la URL.');
        }
    };

    useEffect(() => {
        checkBackendConnection();
    }, []);

    return (
        <div>
            <p>{statusMessage}</p>
        </div>
    );
}

export default StatusConnection;