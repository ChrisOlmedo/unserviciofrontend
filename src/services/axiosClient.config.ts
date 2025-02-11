import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// Configuración básica
const apiClient = axios.create({
    baseURL: apiUrl, // Cambia esto por tu URL base
});

export default apiClient;
