import { LogoForm, AboutForm, ServicesForm, GalleryForm, InformationForm } from "../forms/index";
import { RouteSection } from '../../../../router/routePaths';

export const FORM_COMPONENTS = {
    logo: {
        title: "Editar Logo",
        component: LogoForm,
        // initialValue: null,
        // onSave: (data) => console.log("Logo guardado:", data),
        // description: "Sube una imagen representativa del servicio",
        // icon: "🖼️"
    },
    about: {
        title: "Editar Descripción",
        component: AboutForm,
        // initialValue: "",
        // onSave: (data) => console.log("Descripción guardada:", data),
        // description: "Describe brevemente tu servicio",
        // icon: "📝"
    },
    services: {
        title: "Editar Servicios",
        component: ServicesForm,
        // initialValue: [],
        // onSave: (data) => console.log("Servicios guardados:", data),
        // description: "Agrega los servicios que ofreces",
        // icon: "🛠️"
    },
    gallery: {
        title: "Editar Galería",
        component: GalleryForm,
        // initialValue: [],
        // onSave: (data) => console.log("Galería guardada:", data),
        // description: "Comparte imágenes de tus trabajos",
        // icon: "📸"
    },
    information: {
        title: "Editar Información",
        component: InformationForm,
        // initialValue: {
        //     phone: "",
        //     address: "",
        //     schedule: ""
        // },
        // onSave: (data) => console.log("Información guardada:", data),
        // description: "Datos de contacto y horarios",
        // icon: "ℹ️"
    }
} satisfies Record<RouteSection, {
    title: string;
    component: React.FC;
    //initialValue: any;
    //onSave: (data: any) => void;
    //description?: string;
    //icon?: string;
}>;
