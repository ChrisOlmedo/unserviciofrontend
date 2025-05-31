export type Image = {
    id: string;
    url: string;
    file?: File | null;
};

export interface Review {
    id: string;
    comment: string;
    rating: number;
    author: string;
    date: string;
} 