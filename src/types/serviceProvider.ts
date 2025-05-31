import { Image, Review } from "./shared";

export type RouteSection = 'logo' | 'about' | 'services' | 'gallery' | 'information';
export type CompletionStatus = Record<RouteSection, boolean>;

export interface ProviderBasicInfo {
    slug?: string;
    enterpriseName: string;
    logo: Image;
    serviceCategories: string[];
    rating: number;
}

export interface ProviderContactInfo {
    phone: string;
    whatsapp: string;
    email: string;
}

export interface ProviderServiceArea {
    location: string;
    coverage: {
        maxDistance: number;
        cities: string[];
    };
}

export interface ProviderPageContent {
    services: string[];
    aboutMe: string;
    gallery: Image[];
}

export interface Modifiable {
    hasModifiedData: boolean;
}

export interface FormState {
    hasChangesForm: boolean;
    shouldSave: boolean;
}

export interface ServiceCard extends ProviderServiceArea, ProviderBasicInfo { }
export interface ServiceProviderData extends ServiceCard, ProviderContactInfo, ProviderPageContent { }

export interface ServiceProviderPageConfig extends ServiceProviderData, FormState, Modifiable {
    completionStatus: CompletionStatus;
    deletedImages: string[];
}

export interface ServiceProviderPage extends ServiceProviderData {
    reviews: Review[];
}

export interface EditButtonConfig {
    isConfig: boolean;
}

export interface InformationFormData extends ProviderServiceArea, ProviderContactInfo, Pick<ProviderBasicInfo, 'enterpriseName' | 'serviceCategories'> { } 