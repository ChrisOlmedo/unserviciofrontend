export type User = {
    name: string | "";
    email: string | "";
    role: "user" | "service-provider" | "";
    slug?: string | "";
};

export interface UserData {
    user: User | null;
}

export interface UserState extends UserData {
    isLoading: boolean;
} 