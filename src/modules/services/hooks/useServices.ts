// hooks/useServices.ts

import { useState, useEffect } from 'react';
import { Service } from '../types/service';
import cardData from '../../../types/cardData.json';

export const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Simulamos una llamada a API
                await new Promise(resolve => setTimeout(resolve, 1000));
                setServices(cardData as Service[]);
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