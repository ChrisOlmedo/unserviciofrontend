import ServicesSection from "./serviceProviderSections/ServicesSection";
import AboutSection from "./serviceProviderSections/AboutSection";
import GallerySection from "./serviceProviderSections/GallerySection";
import ServiceArea from "./serviceProviderSections/ServiceArea";
import ProfileSidebar from "./serviceProviderSections/ProfileSidebar";
import { ServiceProviderData } from "types";
import { ConfigContext } from "../context/ConfigFlagContext";
import styles from './ServiceProviderIndex.module.css';

interface ServiceProviderIndexProps {
    serviceProviderData: ServiceProviderData;
    isConfig: boolean;
}

const ServiceProviderIndex = ({ serviceProviderData, isConfig }: ServiceProviderIndexProps) => {

    return (
        <ConfigContext.Provider value={{ isConfig }}>
            <div className={styles.spPage}>
                <ProfileSidebar
                    logo={serviceProviderData.logo}
                    enterpriseName={serviceProviderData.enterpriseName}
                    rating={serviceProviderData.rating}
                    serviceCategories={serviceProviderData.serviceCategories}
                    phone={serviceProviderData.phone}
                    email={serviceProviderData.email}
                    location={serviceProviderData.location}
                />

                <div className={styles.mainContent}>
                    <AboutSection
                        aboutSection={serviceProviderData.aboutMe}
                        enterpriseName={serviceProviderData.enterpriseName}
                    />

                    <ServicesSection services={serviceProviderData.services} />

                    <ServiceArea
                        coverage={serviceProviderData.coverage}
                        location={serviceProviderData.location}
                    />

                    <GallerySection gallery={serviceProviderData.gallery} />
                </div>
            </div>
        </ConfigContext.Provider>
    );
};

export default ServiceProviderIndex;