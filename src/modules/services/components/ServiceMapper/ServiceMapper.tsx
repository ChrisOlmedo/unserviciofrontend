import React from 'react';

import ServiceCard from '../ServiceCard/ServiceCard';
import { ServiceCard as ServiceCardType } from 'types';

interface ServiceMapperProps {
        services: ServiceCardType[];
    renderItem?: (service: ServiceCardType) => React.ReactNode;
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