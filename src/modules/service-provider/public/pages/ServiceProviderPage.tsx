import { useParams } from "react-router-dom";
import ServiceProviderIndex from '../../components/ServiceProviderIndex';
import NoPage from '../../../../pages/NoPage/NoPage';
import Reviews from '../../components/public-sections/Reviews';
import ContactForm from '../../components/public-sections/ContactForm';
import styles from './ServiceProviderPage.module.css';
import { getPublicServiceProviderProfileBySlug } from '../../services/serviceProviderApi';
import { ServiceProviderPublicPage } from "types";
import { useState, useEffect } from "react";
import Loading from "components/Loader/Loader";

const ServiceProviderPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dataService, setDataService] = useState<ServiceProviderPublicPage | null>(null);

    const { slug } = useParams();
    if (!slug) {
        return <NoPage />;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataService = await getPublicServiceProviderProfileBySlug(slug);
                setDataService(dataService as ServiceProviderPublicPage);
            } catch (error) {
                setError('Error al cargar los datos del servicio');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    console.log(error);

    if (loading) {
        return <Loading />;
    };

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