// hooks/useServices.ts

import { useEffect, useState } from 'react';

// Define the Service type (replace with the actual structure if known)
type Service = {
    id: number;
    name: string;
    // Add other fields as needed
};

export const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            // aquí iría tu fetch real
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
            setLoading(false);
        };

        fetchServices();
    }, []);

    return { services, loading };
};