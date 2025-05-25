export type User =
    {
        name: string | "";
        email: string | "";
        role: "user" | "service-provider" | "";
        slug?: string | "";
    }
export interface userData {
    user: User | null;
}
export interface UserState extends userData {
    isLoading: boolean;
}

export type RouteSection = 'logo' | 'about' | 'services' | 'gallery' | 'information';
export type CompletionStatus = Record<RouteSection, boolean>;

// Types básicos
export type Image = {
    url: string;
    file?: File | null;
};


// Interfaces de información del proveedor

export interface ProviderBasicInfo {
    slug?: string;
    enterpriseName: string;
    logo: Image;
    serviceCategories: string[];
    rating: number;
}

// Interfaces de información de contacto
export interface ProviderContactInfo {
    phone: string;
    whatsapp: string;
    email: string;
}

// Interfaces de área de servicio
export interface ProviderServiceArea {
    location: string;
    coverage: {
        maxDistance: number; // en kilómetros
        cities: string[]; // ciudades específicas
    };
}

// Interfaces de contenido de página
export interface ProviderPageContent {
    services: string[];
    aboutMe: string;
    gallery: Image[];
}


//interfaces para el formulario de edicion
export interface Modifiable {
    hasModifiedObject: boolean;
}

export interface FormState {
    hasChangesForm: boolean;
    shouldSave: boolean;
}

// Interfaces compuestas


export interface ServiceCard extends ProviderServiceArea, ProviderBasicInfo { }

export interface ServiceProviderData extends ServiceCard, ProviderContactInfo, ProviderPageContent { }

//interfaces para la pagina de configuarcion del prestador de servicio
export interface ServiceProviderPageConfig extends
    ServiceProviderData,
    FormState,
    Modifiable {
    completionStatus: CompletionStatus;
}
export interface ServiceProviderPage extends
    ServiceProviderData {
    reviews: Review[];
}

export interface EditButtonConfig {
    isConfig: boolean;
}

// Nuevas interfaces para mejor organización
export interface Review {
    id: string;
    comment: string;
    rating: number;
    author: string;
    date: string;
}

