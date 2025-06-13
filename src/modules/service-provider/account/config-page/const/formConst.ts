import { lazy } from 'react';
import { RouteSection } from "types";

const LogoForm = lazy(() => import('../forms/sections/LogoForm').then(m => ({ default: m.default })));
const AboutForm = lazy(() => import('../forms/sections/AboutForm').then(m => ({ default: m.default })));
const ServicesForm = lazy(() => import('../forms/sections/ServicesForm').then(m => ({ default: m.default })));
const GalleryForm = lazy(() => import('../forms/sections/GalleryForm').then(m => ({ default: m.default })));
const InformationForm = lazy(() => import('../forms/sections/InformationForm').then(m => ({ default: m.default })));

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
    component: React.LazyExoticComponent<React.ComponentType<any>>;
    //initialValue: any;
    //onSave: (data: any) => void;
    //description?: string;
    //icon?: string;
}>;
