import { useServices } from '../../hooks/useServices';
import HorizontalServices from './HorizontalServices/HorizontalServices';
import styles from './ServicesIndex.module.css';

const ServicesIndex = () => {
    const { services, loading, error } = useServices();

    if (loading) {
        return <div className={styles.loading}>Cargando servicios...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    return (
        <div className={styles.container}>
            <HorizontalServices services={services} title="Servicios" />
        </div>
    );
};

export default ServicesIndex;