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
        LIST: "/api/service-providers",
        BY_SLUG: (slug: string) => `/api/service-providers/${slug}`,
    }
} as const; // "as const" para inferir tipos literales