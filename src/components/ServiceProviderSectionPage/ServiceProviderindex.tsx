
import Logo from "./Logo";
import ProviderInformation from "./ProviderInformation";
import EnterpriseName from "./EnterpriseName";
import Services from "./Services";
import AboutSection from "./AboutSection";
import GallerySection from "./GallerySection";
import { ServicePage, EditButtonConfig } from "../../types/types";
import { ConfigContext } from "../../context/configServiceProviderContext";

interface ServiceProviderIndexProps extends EditButtonConfig {
    serviceProviderData: ServicePage;

}

const ServiceProviderIndex = ({ serviceProviderData, isConfig, handleModalEdith }: ServiceProviderIndexProps) => {
    return (
        <ConfigContext.Provider value={{ isConfig, handleModalEdith }}>
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
                    <Services services={serviceProviderData.providerPageData.services} />
                    <AboutSection aboutSection={serviceProviderData.providerPageData.aboutMe} />
                    <GallerySection gallery={serviceProviderData.providerPageData.gallery} />
                </section>
            </div>
        </ConfigContext.Provider>
    );
};

export default ServiceProviderIndex;