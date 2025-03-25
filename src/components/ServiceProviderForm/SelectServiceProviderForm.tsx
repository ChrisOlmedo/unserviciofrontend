import LogoForm from './LogoForm';
import AboutForm from './AboutForm';
import ServicesForm from './ServicesForm';
import GalleryForm from './GalleryForm';
import { useParams } from "react-router-dom";
import EditModal from './EditModal'; // Asume que tienes este componente
import TitleModal from '../Modal/TitleModal';

const FORM_SECTIONS = ['logo', 'about', 'services', 'gallery'] as const;
type FormSection = typeof FORM_SECTIONS[number];

const FORM_COMPONENTS: Record<FormSection, () => JSX.Element> = {
    logo: LogoForm,
    about: AboutForm,
    services: ServicesForm,
    gallery: GalleryForm
};

const SelectServiceProviderForm = () => {
    const { section } = useParams();

    // Validar si `section` es parte de FORM_SECTIONS
    const isValidSection = FORM_SECTIONS.includes(section as FormSection);
    const FormComponent = isValidSection ? FORM_COMPONENTS[section as FormSection] : null;

    return (
        <EditModal >
            <TitleModal title={isValidSection ? `Editando ${section}` : 'Sección no válida'} />
            {FormComponent ? <FormComponent /> : <div>Sección no válida: {section}</div>}
        </EditModal>
    );
};

export default SelectServiceProviderForm;
