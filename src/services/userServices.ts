import apiClient from "./axiosClient.config";
import { Action } from "../types/types";

export const getData = async (localStorageId: string, dispatch: React.Dispatch<Action>) => {
    try {
        const response: any = await apiClient.get(`/api/user/getData/${localStorageId}`);
        console.log("Datos del usuario:", response.data);
        dispatch({ type: "Set_User_Data", data: response.data });
    } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
        dispatch({ type: "Logout" });
    }
}