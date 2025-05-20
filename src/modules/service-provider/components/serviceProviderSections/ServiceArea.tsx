import EditButtonAbsolute from "../EditButtonAbsolute";
import EditButton from "../EditButton";
import styles from './ServiceArea.module.css';
import { useConfig } from "../../context/ConfigFlagContext";

interface ServiceAreaProps {
    coverage: {
        maxDistance: number;
        cities: string[];
    };
    location: string;
}

const ServiceArea = ({ coverage, location }: ServiceAreaProps) => {
    const { isConfig } = useConfig();

    return (
        <div className={styles.serviceAreaContainer}>
            <div className={styles.locationInfo}>
                <div className={styles.locationCard}>
                    <h3>Ubicación Principal</h3>
                    <p>{location || 'No especificada'}</p>
                </div>
                <div className={styles.coverageCard}>
                    <h3>Radio de Cobertura</h3>
                    <p>{coverage?.maxDistance ? `${coverage.maxDistance} km` : 'No especificado'}</p>
                </div>
            </div>
            
            <div className={styles.citiesContainer}>
                <h3>Ciudades de Cobertura</h3>
                {coverage?.cities && coverage.cities.length > 0 ? (
                    <div className={styles.citiesList}>
                        {coverage.cities.map((city, index) => (
                            <span key={index} className={styles.cityTag}>
                                {city}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyStateIcon}>🏙️</span>
                        <p className={styles.emptyStateText}>
                            No se han especificado ciudades de cobertura
                        </p>
                    </div>
                )}
            </div>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="information" />
                </EditButtonAbsolute>
            )}
        </div>
    );
};

export default ServiceArea; 