import Services from "./serviceProviderSections/Services";
import AboutSection from "./serviceProviderSections/AboutSection";
import GallerySection from "./serviceProviderSections/GallerySection";
import ServiceArea from "./serviceProviderSections/ServiceArea";
import ProfileSidebar from "./serviceProviderSections/ProfileSidebar";
import { ServiceProviderPageConfig, ServiceProviderPage } from "../../../types/types";
import { ConfigContext } from "../context/ConfigFlagContext";
import styles from './ServiceProviderIndex.module.css';

interface ServiceProviderIndexProps {
    serviceProviderData: ServiceProviderPageConfig | ServiceProviderPage;
    isConfig: boolean;
}

const ServiceProviderIndex = ({ serviceProviderData, isConfig }: ServiceProviderIndexProps) => {
    // Validar que los datos requeridos estén presentes si no es modo configuración
    if (!isConfig) {
        const publicData = serviceProviderData as ServiceProviderPage;
        // Aquí podrías agregar validaciones adicionales si es necesario
    }

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