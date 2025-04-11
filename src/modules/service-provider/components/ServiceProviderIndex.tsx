
import Logo from "./serviceProviderSections/Logo";
import ProviderInformation from "./serviceProviderSections/ProviderInformation";
import EnterpriseName from "./serviceProviderSections/EnterpriseName";
import Services from "./serviceProviderSections/Services";
import AboutSection from "./serviceProviderSections/AboutSection";
import GallerySection from "./serviceProviderSections/GallerySection";
import { EditButtonConfig } from "../../../types/types";
import { ConfigContext } from "../context/ConfigFlagContext";

interface ServiceProviderIndexProps extends EditButtonConfig {
    serviceProviderData: any;
}

const ServiceProviderIndex = ({ serviceProviderData, isConfig }: ServiceProviderIndexProps) => {
    return (
        <ConfigContext.Provider value={{ isConfig }}>
            <div className="serviceProvider-page">
                <div className="serviceProvider-header">
                    <Logo
                        logo={serviceProviderData.logo}
                    />
                    <ProviderInformation
                        enterpriseName={serviceProviderData.enterpriseName}
                        rating={serviceProviderData.rating}
                        typeService={serviceProviderData.typeService}
                        phone={serviceProviderData.phone}
                    />
                </div>
                <section className='serviceProviderContent'>
                    <EnterpriseName enterpriseName={serviceProviderData.enterpriseName} />
                    <Services services={serviceProviderData.services} />
                    <AboutSection aboutSection={serviceProviderData.aboutMe} />
                    <GallerySection gallery={serviceProviderData.gallery} />
                </section>
            </div>
        </ConfigContext.Provider>
    );
};

export default ServiceProviderIndex;