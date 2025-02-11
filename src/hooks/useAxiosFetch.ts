/*
import { useState, useEffect, useMemo } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

const useAxiosFetch = <T>(url: string, options?: AxiosRequestConfig): ApiResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Memorizar opciones para evitar re-renders innecesarios
    const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

    useEffect(() => {
        const controller = new AbortController();  // Para cancelar la solicitud si el componente se desmonta

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get<T>(url, { ...memoizedOptions, signal: controller.signal });
                setData(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        setError(`Error ${err.response.status}: ${err.response.data || 'Ocurrió un problema'}`);
                    } else if (err.request) {
                        setError('No hay respuesta del servidor');
                    } else {
                        setError('Error al configurar la solicitud');
                    }
                } else {
                    setError('Error desconocido');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();  // Cancela la solicitud si el componente se desmonta
        };
    }, [url, memoizedOptions]);

    return { data, loading, error };
};

export default useAxiosFetch;
*/