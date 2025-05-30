import axios from 'config/axiosClient.config';
import { API_ROUTES } from 'constants/apiRoutes';
import { ServiceProviderPageConfig } from "types";

// Obtener el perfil del service provider
export const getServiceProviderProfile = async () => {
    const response = await axios.get(API_ROUTES.SERVICE_PROVIDERS.ME);
    return response.data;
};

// Actualizar el perfil del service provider
export const updateServiceProviderProfile = async (data: Partial<ServiceProviderPageConfig>) => {
    const response = await axios.put(API_ROUTES.SERVICE_PROVIDERS.ME, data);
    return response.data;
}; 

// Crear el perfil del service provider
export const createServiceProviderProfile = async (data: Partial<ServiceProviderPageConfig>) => {
    const response = await axios.post(API_ROUTES.SERVICE_PROVIDERS.ME, data);
    return response.data;
};

// Eliminar el perfil del service provider
export const deleteServiceProviderProfile = async () => {
    const response = await axios.delete(API_ROUTES.SERVICE_PROVIDERS.ME);
    return response.data;
};


