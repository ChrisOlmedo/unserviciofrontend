import apiClient from 'config/axiosClient.config';
import { API_ROUTES } from 'constants/apiRoutes';
import { UserData } from "types";

// Obtener usuario actual por token (para mantener sesión iniciada)
export async function getCurrentUser(): Promise<UserData | null> {
  try {
    const response = await apiClient.get<UserData>(API_ROUTES.USERS.ME, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

// Login con email y password
export async function loginUser(email: string, password: string): Promise<UserData> {
  try {
    const response = await apiClient.post<UserData>(API_ROUTES.AUTH.LOGIN, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Correo o contraseña incorrectos');
      }
      if (error.response.status === 404) {
        throw new Error('Usuario no encontrado');
      }
      throw new Error(error.response.data?.message || 'Error desconocido en login');
    }
    throw new Error('No se pudo conectar con el servidor');
  }
}

// Registro
export async function registerUser(name: string, email: string, password: string): Promise<UserData> {
  try {
    const response = await apiClient.post<UserData>(API_ROUTES.AUTH.REGISTER, { name, email, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 409) {
        throw new Error('El correo ya está registrado');
      }
      throw new Error(error.response.data?.message || 'Error desconocido en registro');
    }
    throw new Error('No se pudo conectar con el servidor');
  }
}

// Login con Google
export default async function loginByGoogle(token: string): Promise<UserData> {
  try {
    const response = await apiClient.post<UserData>(API_ROUTES.AUTH.GOOGLE, { token }, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Error con Google Login');
    }
    throw new Error('No se pudo conectar con el servidor');
  }
}

