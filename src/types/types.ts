
export type Action =
    | { type: "Login", data: userData }
    | { type: "Set_User_Data", data: userData }
    | { type: "Logout" }

export interface userData {
    id: string;
    user: {
        name: string;
        email: string;
        role: 'user' | 'serviceprovider';
    } | null;
}

export interface serviceCard {
    id: number;
    enterpriseName: string;
    logo: string;
    typeService: string;
    rating: number;
}

export interface servicePage extends serviceCard {
    phone: string;
    location: string;
    providerPageData: {
        services: string[];
        aboutMe: string;
        gallery: { url: string }[];
    };
    reviews: { comment: string }[];
}
