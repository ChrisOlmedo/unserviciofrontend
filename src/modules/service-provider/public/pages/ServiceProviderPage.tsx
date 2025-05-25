import dataPage from '../../../../types/providerData.json';
import { useParams } from "react-router-dom";
import ServiceProviderIndex from '../../components/ServiceProviderIndex';
import NoPage from '../../../../pages/NoPage/NoPage';
import Reviews from '../../components/public-sections/Reviews';
import ContactForm from '../../components/public-sections/ContactForm';
import styles from './ServiceProviderPage.module.css';

const ServiceProviderPage = () => {
    const { slug } = useParams();
    const slugIndex = slug ? parseInt(slug, 10) - 1 : -1;
    const dataService = dataPage[slugIndex];
    if (!dataService) {
        return <NoPage />;
    };

    return (
        <div className={styles.page}>
            <ServiceProviderIndex serviceProviderData={dataService} isConfig={false} />
            <div className={styles.publicSections}>
                <section className={styles.reviewsSection}>
                    <h2 className={styles.sectionTitle}>Reseñas</h2>
                    <Reviews reviews={dataService.reviews} />
                </section>
                <section className={styles.contactSection}>
                    <h2 className={styles.sectionTitle}>Haz una cotización o solicita un servicio</h2>
                    <ContactForm />
                </section>
            </div>
        </div>
    );
};

export default ServiceProviderPage;