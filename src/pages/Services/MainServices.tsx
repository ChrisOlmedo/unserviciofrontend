import React from 'react';
import ServicesIndex from '../Home/ServicesIndex';

const MainServices: React.FC = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Nuestros Servicios</h1>
            <ServicesIndex />
        </div>
    );
};

export default MainServices;