import apiClient from './axiosClient.config';
import { userData } from '../types/types';


const loginByGoogle = async (token: string, login: (userData: userData) => void): Promise<void> => {
    try {
        const response: any = await apiClient.post('/api/auth/google', { token });
        console.log('Response:', response.data);
        login(response.data);
    } catch (error) {
        console.error('Error en login:', error);
        throw new Error('Error al iniciar sesión');
    }
}

export default loginByGoogle;