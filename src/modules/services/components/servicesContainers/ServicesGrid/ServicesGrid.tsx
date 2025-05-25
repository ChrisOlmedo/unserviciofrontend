import React from 'react';
import { Service } from '../../../types/service';
import ServiceMapper from '../../ServiceMapper/ServiceMapper';
import styles from './ServicesGrid.module.css';

interface ServicesGridProps {
    services: Service[];
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
    return (
        <div className={styles.grid}>
            <ServiceMapper services={services} />
        </div>
    );
};

export default ServicesGrid; 