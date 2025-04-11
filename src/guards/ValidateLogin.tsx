// src/guards/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../modules/user/context/userContext";
import { ReactNode } from "react";

const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { userState } = useUser(); // Tu contexto global de usuario
    const location = useLocation();

    if (userState.isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!userState.user) {
        // Redirige al login pero recuerda la página a la que intentaba entrar
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;