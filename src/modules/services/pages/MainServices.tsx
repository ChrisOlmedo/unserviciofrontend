import { useServices } from '../hooks/useServices';
import Section from '../components/Section/Section';
import styles from './MainServices.module.css';

const MainServices = () => {
    const { services, loading, error } = useServices();

    if (loading) {
        return <div className={styles.loading}>Cargando servicios...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    // Aquí podrías filtrar los servicios según diferentes criterios
    const featuredServices = services.slice(0, 4);
    const popularServices = services.slice(4, 8);
    const newServices = services.slice(8);

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Nuestros Servicios</h1>
            
            <Section 
                title="Servicios Destacados" 
                services={featuredServices}
                className={styles.featuredSection}
            />
            
            <Section 
                title="Servicios Populares" 
                services={popularServices}
                className={styles.popularSection}
            />
            
            <Section 
                title="Nuevos Servicios" 
                services={newServices}
                className={styles.newSection}
            />
        </div>
    );
};

export default MainServices;