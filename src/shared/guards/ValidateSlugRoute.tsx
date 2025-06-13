import { useParams, Navigate } from "react-router-dom";
import { useUser } from "modules/user/context/userContext";
import { ReactNode } from "react";
import { ServiceProviderConfigProvider } from "modules/service-provider/account/config-page/context/ServiceProviderConfigContext";
import { routePaths } from "router/routePaths";

const ValidateSlugRoute = ({ children }: { children: ReactNode }) => {
    const { route } = useParams();
    const { userState } = useUser();

    // Si no hay usuario, redirigir al login
    if (!userState.user) {
        return <Navigate to={routePaths.login} replace />;
    }

    // Si es usuario normal, solo puede acceder a create
    if (userState.user.role === "user") {
        return route === "create" ? (
            <ServiceProviderConfigProvider>
                {children}
            </ServiceProviderConfigProvider>
        ) : (
            <Navigate to={routePaths.account.serviceProvider.create} replace />
        );
    }

    // Si es service-provider, solo puede acceder a edit
    if (userState.user.role === "service-provider") {
        return route === "edit" ? (
            <ServiceProviderConfigProvider>
                {children}
            </ServiceProviderConfigProvider>
        ) : (
            <Navigate to={routePaths.account.serviceProvider.edit} replace />
        );
    }

    // Si no cumple ninguna condición, redirigir a 404
    return <Navigate to={routePaths.notFound} replace />;
};

export default ValidateSlugRoute;