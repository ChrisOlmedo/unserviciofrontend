import Services from "./serviceProviderSections/Services";
import AboutSection from "./serviceProviderSections/AboutSection";
import GallerySection from "./serviceProviderSections/GallerySection";
import ServiceArea from "./serviceProviderSections/ServiceArea";
import ProfileSidebar from "./serviceProviderSections/ProfileSidebar";
import { EditButtonConfig, Image } from "../../../types/types";
import { ConfigContext } from "../context/ConfigFlagContext";
import styles from './ServiceProviderIndex.module.css';

interface ServiceProviderIndexProps extends EditButtonConfig {
    serviceProviderData: {
        logo: Image;
        enterpriseName: string;
        rating: number;
        typeService: string;
        phone: string;
        email?: string;
        address?: string;
        services: string[];
        coverage: {
            maxDistance: number;
            cities: string[];
        };
        location: string;
        aboutMe: string;
        gallery: Image[];
    };
}

const ServiceProviderIndex = ({ serviceProviderData, isConfig }: ServiceProviderIndexProps) => {
    return (
        <ConfigContext.Provider value={{ isConfig }}>
            <div className={styles.page}>
                <ProfileSidebar
                    logo={serviceProviderData.logo}
                    enterpriseName={serviceProviderData.enterpriseName}
                    rating={serviceProviderData.rating}
                    typeService={serviceProviderData.typeService}
                    phone={serviceProviderData.phone}
                    email={serviceProviderData.email}
                    address={serviceProviderData.address}
                />

                <div className={styles.mainContent}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Sobre {serviceProviderData.enterpriseName}</h2>
                        <AboutSection aboutSection={serviceProviderData.aboutMe} />
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Servicios Ofrecidos</h2>
                        <Services services={serviceProviderData.services} />
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Zona de Servicio</h2>
                        <ServiceArea 
                            coverage={serviceProviderData.coverage}
                            location={serviceProviderData.location}
                        />
                    </section>
                    
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Galería de Trabajos</h2>
                        <GallerySection gallery={serviceProviderData.gallery} />
                    </section>
                </div>
            </div>
        </ConfigContext.Provider>
    );
};

export default ServiceProviderIndex;