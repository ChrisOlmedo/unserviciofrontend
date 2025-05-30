import { UserState } from "types";
import apiClient from "config/axiosClient.config";
import { API_ROUTES } from "constants/apiRoutes";

export const getUser = async (): Promise<UserState | null> => {
    try {
        const response = await apiClient.get<UserState>(API_ROUTES.USERS.ME, { withCredentials: true });

        // Si no hay datos, devolver null en lugar de undefined
        return response.data ?? null;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return null; // Si hay un error (ej. token inválido), devolvemos null
    }
}; 