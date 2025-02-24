import apiClient from './axiosClient.config';
import { userData } from '../types/types';
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/user/profile", { credentials: "include" });
                if (!response.ok) throw new Error("No autenticado");

                const data = await response.json();
                setUser(data); // Guardar datos en el estado local
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { user, loading };
};


const loginByGoogle = async (token: string): Promise<userData | null> => {
    try {
        const response = await apiClient.post<userData>('/api/auth/google', { token }, { withCredentials: true });
        console.log('Response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error en login:', error);

        // Si la API devuelve un error con mensaje, úsalo
        const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';

        console.warn('Detalle del error:', errorMessage);
        return null; // Evita lanzar un error y permite manejarlo en el frontend
    }
};

export default loginByGoogle;

export const logout = async (): Promise<void> => {
    try {
        await apiClient.post("/api/user/logout", {}, { withCredentials: true });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }

};
