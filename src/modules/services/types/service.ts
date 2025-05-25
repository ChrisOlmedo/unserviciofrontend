export interface Service {
    id: string;
    logo: string;
    enterpriseName: string;
    typeService: string;
    rating: number;
}

export interface ServicesResponse {
    services: Service[];
    loading: boolean;
    error?: Error;
} 