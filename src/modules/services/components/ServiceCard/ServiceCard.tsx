import styles from './ServiceCard.module.css';

interface ServiceCardProps {
    logo: string;
    enterpriseName: string;
    typeService: string;
    rating: number;
}

const ServiceCard = (props: ServiceCardProps) => {
    const { logo, enterpriseName, typeService, rating } = props;

    return (
        <div className={styles.serviceCard}>
            <img
                src={logo}
            >
            </img>
            <h3>{enterpriseName}</h3>
            <div className={styles.infoCard}>
                <span>{typeService}</span>
                <span>{rating}⭐</span>
            </div>
        </div>
    );
}

export default ServiceCard;