import { UserState } from "../types/types";
import apiClient from "./axiosClient.config";

export const getData = async (): Promise<UserState | null> => {
    try {
        const response = await apiClient.get<UserState>("/api/user/getData", { withCredentials: true });

        // Si no hay datos, devolver null en lugar de undefined
        return response.data ?? null;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return null; // Si hay un error (ej. token inválido), devolvemos null
    }
};
