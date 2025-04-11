import { useParams, Navigate } from "react-router-dom";
import { useUser } from "../modules/user/context/userContext";
import { ReactNode } from "react";
import NoPage from "../pages/NoPage/NoPage";

const ValidateSlugRoute = ({ children }: { children: ReactNode }) => {
    const { slug } = useParams(); // Slug de la URL (ej: "electro-soluciones")
    const { userState } = useUser(); // Contexto con user.slug y user.isProvider

    // Caso 1: Usuario no proveedor => Solo puede acceder a "/account/create-page"
    if (userState.user?.role === "user" && slug !== "create-page") {
        return <NoPage />; // Redirige a una página de error o muestra un mensaje de error
        //return <Navigate to="/account/create-page" replace />;
    }

    // Caso 2: Proveedor con slug incorrecto => Redirige a su slug real
    if (userState.user?.role === "provider" && userState.user.slug !== slug) {
        return <Navigate to={`/account/${userState.user.slug}`} replace />;
    }

    // Caso 3: Slug válido (proveedor o "create-page")
    return children;
};

export default ValidateSlugRoute;