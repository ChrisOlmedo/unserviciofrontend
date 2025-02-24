
import { createContext, useContext, useState, useEffect } from "react";
import { ServiceCard } from "../types/types";
import apiClient from "../services/axiosClient.config";

interface ServiceContextType {
    services: ServiceCard[];
    fetchServices: () => Promise<void>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
    const [services, setServices] = useState<ServiceCard[]>([]);

    const fetchServices = async () => {
        try {
            const response = await apiClient.get<ServiceCard[]>("/api/provider/getProviders");
            if (!response) return;
            const data: ServiceCard[] = response.data;

            // Transformar los datos al formato necesario
            const formattedData: ServiceCard[] | any = data.map((service: any) => ({
                id: service._id, // Si usas MongoDB
                title: service.title,
                description: service.description,
                price: service.price,
                imageUrl: service.imageUrl || "default.jpg", // Valor por defecto
                providerName: service.provider.name,
            }));

            setServices(formattedData);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <ServiceContext.Provider value={{ services, fetchServices }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error("useServices must be used within a ServiceProvider");
    }
    return context;
};

export default ServiceProvider;