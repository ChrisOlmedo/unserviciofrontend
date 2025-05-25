import React from 'react';
import { Service } from '../../types/service';
import ServiceCard from '../ServiceCard/ServiceCard';

interface ServiceMapperProps {
    services: Service[];
    renderItem?: (service: Service) => React.ReactNode;
}

const ServiceMapper: React.FC<ServiceMapperProps> = ({ services, renderItem }) => {
    if (renderItem) {
        return <>{services.map(renderItem)}</>;
    }

    return (
        <>
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    {...service}
                />
            ))}
        </>
    );
};

export default ServiceMapper; 