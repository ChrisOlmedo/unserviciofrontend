// Rutas del frontend para React Router y navegación interna
// Ejemplo de uso: <Link to={routePaths.login} />

import { RouteSection } from "types";

// Tipos para autocompletado y validación

export const routePaths = {
    // Rutas base
    home: "/",
    login: "/login",
    services: "/services",

    // Rutas de cuenta
    account: {
        base: "/account",
        profile: "/account/profile",
        settings: "/account/settings",
        serviceProvider: {
            create: "/account/service-provider/create",
            edit: "/account/service-provider/edit",
            getSectionEdit: (section: RouteSection) => `forms/${section}`, 
            sections: {
                logo: () => routePaths.account.serviceProvider.getSectionEdit('logo'),
                about: () => routePaths.account.serviceProvider.getSectionEdit('about'),
                services: () => routePaths.account.serviceProvider.getSectionEdit('services'),
                gallery: () => routePaths.account.serviceProvider.getSectionEdit('gallery'),
                information: () => routePaths.account.serviceProvider.getSectionEdit('information'),
            }
        }
    },

    // Rutas dinámicas
    serviceProvider: {
        public: (slug: string) => `/services/${slug}`,
    },

    // Rutas de error
    notFound: "/404",
} as const;
