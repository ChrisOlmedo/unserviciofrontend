import React from 'react';
import styles from './ServiceArea.module.css';
import EditButton from "modules/service-provider/components/EditButton";
import EditButtonAbsolute from "modules/service-provider/components/EditButtonAbsolute";
import { useConfig } from "modules/service-provider/context/ConfigFlagContext";

interface ServiceAreaProps {
    coverage: {
        maxDistance: number;
        cities: string[];
    };
    location: string;
}

const ServiceArea: React.FC<ServiceAreaProps> = ({ coverage, location }) => {
    const { isConfig } = useConfig();

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Área de Servicio</h2>

            <div className={styles.locationInfo}>
                <div className={styles.locationCard}>
                    <h3>Ubicación Principal</h3>
                    <p>📍 {location}</p>
                </div>

                <div className={styles.coverageCard}>
                    <h3>Radio de Cobertura</h3>
                    <p>{coverage.maxDistance} km</p>
                </div>
            </div>

            <div className={styles.coverageContainer}>
                <h3 className={styles.coverageTitle}>Ciudades de Cobertura</h3>
                <div className={styles.citiesContainer}>
                    <div className={styles.citiesList}>
                        {coverage.cities.map((city, index) => (
                            <span key={index} className={styles.cityTag}>
                                {city}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {isConfig && (
                <EditButtonAbsolute>
                    <EditButton context="information" />
                </EditButtonAbsolute>
            )}
        </section>
    );
};

export default ServiceArea; 