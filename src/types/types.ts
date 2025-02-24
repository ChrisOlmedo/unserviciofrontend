
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

export interface ServiceCard {
    id: number;
    enterpriseName: string;
    logo: string;
    typeService: string;
    rating: number;
}

export interface servicePage extends ServiceCard {
    phone: string;
    location: string;
    providerPageData: {
        services: string[];
        aboutMe: string;
        gallery: { url: string }[];
    };
    reviews: { comment: string }[];
}
