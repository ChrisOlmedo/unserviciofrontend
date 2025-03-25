// Define tipos y configs para todos los formularios  
export type FormStatus = "logoForm" | "aboutForm" | "serviceForm" | "galleryForm";

export const FORM_CONFIGS: Record<FormStatus, { title: string; }> = {
    logoForm: { title: "Editar Logo" },
    aboutForm: { title: "Editar Descripción" },
    serviceForm: { title: "Editar Servicios" },
    galleryForm: { title: "Editar Galería" },
};  