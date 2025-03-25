
export type UserAction =
    | { type: "SET_USER", data: userData }
    | { type: "LOGOUT" }
    | { type: "SET_LOADING", isLoading: boolean };

export interface userData {
    user: {
        name: string | null;
        email: string | null;
        role: string | null;
    } | null;
}
export interface UserState extends userData {
    isLoading: boolean;
}

export type Image = { url: string };

interface ServiceSlug {
    slug?: string;
}

interface ServiceReview {
    reviews: {
        rating?: number;
        comment: string;
        user?: string;
    }[];
}

export interface ServiceProviderBasics {
    enterpriseName: string;
    logo: Image;
    typeService: string;
    rating?: number;
}

export interface ServiceProviderDataPage {
    phone: string;
    location: string;
    providerPageData: {
        services: string[];
        aboutMe: string;
        gallery: Image[];
    };
}

export interface ServiceCard extends ServiceSlug, ServiceProviderBasics { }
export interface ServicePage extends ServiceCard, ServiceReview, ServiceProviderDataPage { }


export interface EditButtonConfig {
    isConfig: boolean;
}

