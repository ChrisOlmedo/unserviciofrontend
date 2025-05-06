

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
// Types básicos
export type Image = {
    url: string;
    file?: File | null;
};

// Interfaces de características
interface Slugable {
    slug?: string;
}

interface Reviewable {
    reviews: {
        rating?: number;
        comment: string;
        user?: string;
    }[];
}

// Interfaces de información del proveedor
export interface ProviderBasicInfo {
    enterpriseName: string;
    logo: Image;
    typeService: string;
    rating?: number;
}

export interface ProviderContactInfo {
    phone: string;
    whatsapp: string;
    email: string;
}

export interface ProviderServiceArea {
    location: string;
    coverage?: {
        maxDistance: number; // en kilómetros
        cities?: string[]; // ciudades específicas
    };
}

export interface ProviderPageContent {
    services: string[];
    aboutMe: string;
    gallery: Image[];
}

// Interfaces compuestas
export interface ServiceCard extends Slugable, ProviderServiceArea, ProviderBasicInfo { }

export interface ServicePage extends
    ServiceCard,
    Reviewable,
    ProviderContactInfo,
    ProviderPageContent { }


export interface ServiceProviderPageConfig extends
    ServiceCard,
    ProviderContactInfo,
    ProviderPageContent {

    hasChangesForm: boolean;
    hasModifiedObject: boolean;
}

export interface EditButtonConfig {
    isConfig: boolean;
}

