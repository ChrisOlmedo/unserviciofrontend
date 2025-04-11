import LogoForm from '../forms/LogoForm';
import AboutForm from '../forms/AboutForm';
import ServicesForm from '../forms/ServicesForm';
import GalleryForm from '../forms/GalleryForm';
import InformationForm from '../forms/InformationForm';
import FormModal from '../forms/FormModal'; // Asume que tienes este componente
import { RouteSection } from '../../../../router/routePaths';
import { Route } from 'react-router-dom';


const FORM_COMPONENTS = {
    logo: { component: LogoForm, title: "Editar Logo" },
    about: { component: AboutForm, title: "Editar Descripción" },
    services: { component: ServicesForm, title: "Editar Servicios" },
    gallery: { component: GalleryForm, title: "Editar Galería" },
    information: { component: InformationForm, title: "Editar Información" }
} satisfies Record<RouteSection, { component: React.FC; title: string }>;

const ServiceProviderFormRoutes = () => {

    return Object.entries(FORM_COMPONENTS).map(([section, config]) => (
        <Route
            key={section}
            path={section}
            element={
                <FormModal titleModal={config.title}>
                    <config.component />
                </FormModal>
            }
        />
    ));
};

export default ServiceProviderFormRoutes;
