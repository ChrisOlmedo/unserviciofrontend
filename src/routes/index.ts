// Tipos para autocompletado y validación
export type RouteSection = 'logo' | 'about' | 'services' | 'gallery' | 'contact';

// Objeto principal de rutas
export const routePaths = {
    sections: {
        logo: '/account/bepartner/logo/edit',
        about: '/account/bepartner/about/edit',
        services: '/account/bepartner/services/edit',
        gallery: '/account/bepartner/gallery/edit',
        contact: '/account/bepartner/contact/edit',
    },
    // Funciones generadoras con validación
    getSectionEdit: (section: RouteSection) => `/account/bepartner/${section}/edit`
} as const;

// Hook para uso en componentes
export const useRoutes = () => {
    const generatePath = (section: RouteSection) =>
        `/account/bepartner/${section}/edit`;

    return {
        sections: routePaths.sections,
        getSectionEdit: generatePath,
        // Puedes añadir más funciones aquí
    };
};