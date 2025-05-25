import { Link } from 'react-router-dom';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
    id: string;
    logo: string;
    enterpriseName: string;
    typeService: string;
    rating: number;
}

const ServiceCard = ({ id, logo, enterpriseName, typeService, rating }: ServiceCardProps) => {
    return (
        <Link to={`/services/${id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={logo} alt={enterpriseName} className={styles.image} />
            </div>
            
            <div className={styles.content}>
                <h3 className={styles.name}>{enterpriseName}</h3>
                <div className={styles.info}>
                    <span className={styles.type}>{typeService}</span>
                    <span className={styles.rating}>{rating}⭐</span>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;