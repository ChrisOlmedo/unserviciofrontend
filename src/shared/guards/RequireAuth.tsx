// Guard de ruta: protege rutas que requieren usuario autenticado
// Uso: <RequireAuth>...</RequireAuth>

import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "modules/user/context/userContext";
import { ReactNode } from "react";
import Loading from "components/Loader/Loader";

const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { userState } = useUser(); // Tu contexto global de usuario
    const location = useLocation();

    if (userState.isLoading) {
        return <Loading />;
    }

    if (!userState.user) {
        // Redirige al login pero recuerda la página a la que intentaba entrar
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth; 