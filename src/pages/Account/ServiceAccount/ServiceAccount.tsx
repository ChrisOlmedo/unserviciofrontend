import { useReducer, useEffect } from "react";
import { ServicePage } from '../../../types/types';
import ServiceProviderIndex from "../../../components/ServiceProviderPage/ServiceProviderIndex.tsx";
import { Outlet, useMatch } from "react-router-dom";

// Tipos para el reducer
type ServiceState = {
    data: ServicePage;
    modified: boolean;
};

type ServiceAction =
    | { type: 'SET_DATA'; payload: ServicePage }
    | { type: 'UPDATE_FIELD'; field: keyof ServicePage; value: string }
    | { type: 'RESET_MODIFIED' };

// Reducer para manejar el estado
const serviceReducer = (state: ServiceState, action: ServiceAction): ServiceState => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload };
        case 'UPDATE_FIELD':
            return {
                data: { ...state.data, [action.field]: action.value },
                modified: true
            };
        case 'RESET_MODIFIED':
            return { ...state, modified: false };
        default:
            return state;
    }
};

const initialState: ServiceState = {
    data: {
        nombre: "",
        descripcion: "",
        contacto: "",
        // ...otros campos según tu interfaz ServicePage
    },
    modified: false
};

function ServiceProviderPageConfig() {
    const [state, dispatch] = useReducer(serviceReducer, initialState);
    const isEditing = useMatch('/account/bepartner/edit/*');

    // Fetch de datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Reemplaza con tu llamada API real
                const response = await fetch('/api/service-provider');
                const data: ServicePage = await response.json();
                dispatch({ type: 'SET_DATA', payload: data });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Función para guardar cambios
    const handleGuardar = async () => {
        try {
            await fetch('/api/service-provider', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state.data)
            });
            dispatch({ type: 'RESET_MODIFIED' });
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    // Provee los datos al Outlet
    const outletContext = {
        serviceData: state.data,
        updateField: (field: keyof ServicePage, value: string) =>
            dispatch({ type: 'UPDATE_FIELD', field, value }),
        handleGuardar
    };

    return (
        <>
            <ServiceProviderIndex
                serviceProviderData={state.data}
                isConfig={true}
                hasUnsavedChanges={state.modified}
                onSave={handleGuardar}
            />

            <Outlet context={outletContext} />
        </>
    );
}

export default ServiceProviderPageConfig;