export interface ServiceProviderConfig {
    logo?: Image;
    enterpriseName?: string;
    rating?: number;
    typeService?: string;
    phone?: string;
    email?: string;
    address?: string;
    services?: string[];
    coverage?: {
        maxDistance?: number;
        cities?: string[];
    };
    location?: string;
    aboutMe?: string;
    gallery?: Image[];
}

export interface ServiceProviderPublic {
    logo: Image;
    enterpriseName: string;
    rating: number;
    typeService: string;
    phone: string;
    email: string;
    address: string;
    services: string[];
    coverage: {
        maxDistance: number;
        cities: string[];
    };
    location: string;
    aboutMe: string;
    gallery: Image[];
} 