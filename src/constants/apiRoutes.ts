// Rutas de la API backend para uso en servicios HTTP (axios/fetch)
// Ejemplo de uso: axios.get(API_ROUTES.USERS.ME)

export const API_ROUTES = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        LOGOUT: "/api/auth/logout",
        GOOGLE: "/api/auth/google",
        REFRESH_TOKEN: "/api/auth/refresh-token",
    },
    USERS: {
        ME: "/api/users/me",
        BY_ID: (id: string) => `/api/users/${id}`,
    },
    SERVICE_PROVIDERS: {
        ME: "/api/service-providers/me",
        PUBLIC: "/api/service-providers/public",
        BY_SLUG: (slug: string) => `/api/service-providers/public/${slug}`,
    }
} as const; // "as const" para inferir tipos literales