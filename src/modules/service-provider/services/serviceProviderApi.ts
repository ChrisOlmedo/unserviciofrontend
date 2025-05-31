import apiClient from 'config/axiosClient.config';
import { API_ROUTES } from 'constants/apiRoutes';

// Obtener el perfil del service provider
export const getServiceProviderProfile = async () => {
    const response = await apiClient.get(API_ROUTES.SERVICE_PROVIDERS.ME);
    return response.data;
};

// Actualizar el perfil del service provider
export const updateServiceProviderProfile = async (data: FormData) => {
    const response = await apiClient.put(API_ROUTES.SERVICE_PROVIDERS.ME, data, { withCredentials: true });
    return response.data;
}; 

// Crear el perfil del service provider
export const createServiceProviderProfile = async (data: FormData) => {
    const response = await apiClient.post(API_ROUTES.SERVICE_PROVIDERS.ME, data, { withCredentials: true });
    return response.data;
};

// Eliminar el perfil del service provider
export const deleteServiceProviderProfile = async () => {
    const response = await apiClient.delete(API_ROUTES.SERVICE_PROVIDERS.ME);
    return response.data;
};


