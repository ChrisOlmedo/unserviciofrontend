// hooks/useServices.ts

import { useState, useEffect } from 'react';
import { ServiceCard } from 'types';
import apiClient from 'config/axiosClient.config';
import { API_ROUTES } from 'constants/apiRoutes';

export const useServices = () => {
    const [services, setServices] = useState<ServiceCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Simulamos una llamada a API
                const response = await apiClient.get(API_ROUTES.SERVICE_PROVIDERS.PUBLIC.ALL);
                const cardData = response.data as ServiceCard[];
                if (cardData.length === 0) {
                    setError(new Error('No se encontraron servicios'));
                    setLoading(false);
                    return;
                }
                setServices(cardData);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Error al cargar servicios'));
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return { services, loading, error };
};