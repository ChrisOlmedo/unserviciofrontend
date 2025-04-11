

// Tipos para autocompletado y validación
export type RouteSection = 'logo' | 'about' | 'services' | 'gallery' | 'information';

export const routePaths = {

    // Generador dinámico
    getSectionEdit: (section: RouteSection) => `edit/${section}`,
    sections: {
        logo: () => routePaths.getSectionEdit('logo'),
        about: () => routePaths.getSectionEdit('about'),
        services: () => routePaths.getSectionEdit('services'),
        gallery: () => routePaths.getSectionEdit('gallery'),
        information: () => routePaths.getSectionEdit('information'),
    },
    home: "/",
    login: "/login",
    services: "/services",
    //account: "/account",
    profile: "/account/profile",
    settings: "/account/settings",

    // Rutas dinámicas
    serviceProvider: (slug: string) => `/services/${slug}`,

    // Agrupadores para claridad
    account: {
        base: "/account",
        profile: "/account/profile",
        settings: "/account/settings",
        providerConfig: (slug: string) => `/account/${slug}`,
        section: (slug: string, section: string) => `/account/${slug}/edit/${section}`,
    },
} as const;
