import { Link } from 'react-router-dom';
import styles from './ServiceCard.module.css';
import { ServiceCard as ServiceCardType } from 'types';
import CategoryPill from 'components/CategoryPill/CategoryPill';

interface ServiceCardProps extends ServiceCardType { }

const ServiceCard = ({ slug, logo, enterpriseName, serviceCategories, rating }: ServiceCardProps) => {
    // Mostrar solo 2.5 categorías
    const visibleCategories = serviceCategories.slice(0, 2);
    const hasMore = serviceCategories.length > 2;

    return (
        <Link to={`/services/${slug}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={logo.url} alt={enterpriseName} className={styles.image} />
            </div>
            <div className={styles.contentContainer}>
            <div className={styles.categories}>
                {visibleCategories.map((cat, i) => (
                    <CategoryPill key={i}>{cat}</CategoryPill>
                ))}
                {hasMore && <CategoryPill>...</CategoryPill>}
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{enterpriseName}</h3>
                <div className={styles.info}>
                    <span className={styles.rating}>{rating ? rating : 0}⭐</span>
                </div>
            </div>
            </div>
        </Link>
    );
};

export default ServiceCard;