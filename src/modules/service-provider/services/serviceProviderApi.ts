import apiClient from 'config/axiosClient.config';
import { API_ROUTES } from 'constants/apiRoutes';
import { ServiceProviderData } from 'types';
// Obtener el perfil del service provider
export const getServiceProviderProfile = async (): Promise<ServiceProviderData> => {
    const response = await apiClient.get(
        API_ROUTES.SERVICE_PROVIDERS.ME, 
        { withCredentials: true }
    );
    return response.data as ServiceProviderData;
};

// Actualizar el perfil del service provider
export const updateServiceProviderProfile = async (data: FormData): Promise<ServiceProviderData> => {
    const response = await apiClient.put(
        API_ROUTES.SERVICE_PROVIDERS.ME, 
        data, 
        { withCredentials: true, 
            headers: { 'Content-Type': 'multipart/form-data' } 
        }
    );
    return response.data as ServiceProviderData;
}; 

// Crear el perfil del service provider
export const createServiceProviderProfile = async (data: FormData): Promise<ServiceProviderData> => {
    const response = await apiClient.post(
        API_ROUTES.SERVICE_PROVIDERS.ME, 
        data, 
        { withCredentials: true, 
            headers: { 'Content-Type': 'multipart/form-data' } 
        }
    );
    return response.data as ServiceProviderData;
};

// Eliminar el perfil del service provider
export const deleteServiceProviderProfile = async () => {
    const response = await apiClient.delete(
        API_ROUTES.SERVICE_PROVIDERS.ME, 
        { withCredentials: true }
    );
    return response.data;
};


