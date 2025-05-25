import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import styles from './ServicesList.module.css';

interface Service {
    id: string;
    name: string;
    type: string;
    description: string;
    rating: number;
    price: number;
    image: string;
    logo: string;
}

interface ServicesListProps {
    services: Service[];
    onContact?: (serviceId: string) => void;
}

const ServicesList: React.FC<ServicesListProps> = ({ services, onContact }) => {
    return (
        <div className={styles.list}>
            {services.map((service) => (
                <div key={service.id} className={styles.listItem}>
                    <div className={styles.listContent}>
                        <div className={styles.imageContainer}>
                            <img src={service.image} alt={service.name} className={styles.image} />
                        </div>
                        
                        <div className={styles.info}>
                            <h3 className={styles.name}>{service.name}</h3>
                            <p className={styles.type}>{service.type}</p>
                            <div className={styles.rating}>
                                <FaStar />
                                <span>{service.rating.toFixed(1)}</span>
                            </div>
                            <p className={styles.description}>{service.description}</p>
                        </div>

                        <div className={styles.actions}>
                            <Link 
                                to={`/services/${service.id}`}
                                className={`${styles.button} ${styles.secondaryButton}`}
                            >
                                Ver más
                            </Link>
                            <button 
                                onClick={() => onContact?.(service.id)}
                                className={`${styles.button} ${styles.primaryButton}`}
                            >
                                Contactar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServicesList; 