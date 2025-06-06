import { ServiceCard } from "types";

export interface ServicesResponse {
    services: ServiceCard[];
    loading: boolean;
    error?: Error;
} 