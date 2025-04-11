import React from 'react';
import ServicesIndex from '../components/servicesContainers/ServicesIndex';
//import { useServices } from '../../context/providerServicesContext';

const MainServices: React.FC = () => {
    //const context = useServices();
    //context.fetchServices();
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Nuestros Servicios</h1>
            <ServicesIndex />
        </div>
    );
};

export default MainServices;